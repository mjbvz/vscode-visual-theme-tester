package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Username  string    `json:"username" gorm:"uniqueIndex;not null"`
	Email     string    `json:"email" gorm:"uniqueIndex;not null"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	IsActive  bool      `json:"is_active" gorm:"default:true"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateUserRequest struct {
	Username  string `json:"username" binding:"required,min=3,max=50"`
	Email     string `json:"email" binding:"required,email"`
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty"`
}

type Server struct {
	db       *gorm.DB
	router   *mux.Router
	upgrader websocket.Upgrader
	clients  map[*websocket.Conn]bool
}

func NewServer(db *gorm.DB) *Server {
	s := &Server{
		db:      db,
		router:  mux.NewRouter(),
		clients: make(map[*websocket.Conn]bool),
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // Allow connections from any origin in development
			},
		},
	}

	s.setupRoutes()
	return s
}

func (s *Server) setupRoutes() {
	api := s.router.PathPrefix("/api/v1").Subrouter()
	
	// REST endpoints
	api.HandleFunc("/users", s.handleGetUsers).Methods("GET")
	api.HandleFunc("/users", s.handleCreateUser).Methods("POST")
	api.HandleFunc("/users/{id:[0-9]+}", s.handleGetUser).Methods("GET")
	api.HandleFunc("/users/{id:[0-9]+}", s.handleUpdateUser).Methods("PUT")
	api.HandleFunc("/users/{id:[0-9]+}", s.handleDeleteUser).Methods("DELETE")
	
	// WebSocket endpoint
	s.router.HandleFunc("/ws", s.handleWebSocket)
	
	// Health check
	s.router.HandleFunc("/health", s.handleHealthCheck).Methods("GET")
	
	// Static file serving
	s.router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
}

func (s *Server) handleGetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User
	query := s.db.Where("is_active = ?", true)
	
	// Handle query parameters
	if search := r.URL.Query().Get("search"); search != "" {
		searchTerm := "%" + strings.ToLower(search) + "%"
		query = query.Where("LOWER(username) LIKE ? OR LOWER(email) LIKE ?", searchTerm, searchTerm)
	}
	
	if limit := r.URL.Query().Get("limit"); limit != "" {
		if l, err := strconv.Atoi(limit); err == nil && l > 0 && l <= 100 {
			query = query.Limit(l)
		}
	}
	
	if offset := r.URL.Query().Get("offset"); offset != "" {
		if o, err := strconv.Atoi(offset); err == nil && o >= 0 {
			query = query.Offset(o)
		}
	}

	result := query.Order("created_at DESC").Find(&users)
	if result.Error != nil {
		http.Error(w, "Database query failed", http.StatusInternalServerError)
		log.Printf("Error querying users: %v", result.Error)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		log.Printf("Error encoding users: %v", err)
	}
}

func (s *Server) handleCreateUser(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if req.Username == "" || req.Email == "" {
		http.Error(w, "Username and email are required", http.StatusBadRequest)
		return
	}

	user := User{
		Username:  strings.TrimSpace(req.Username),
		Email:     strings.ToLower(strings.TrimSpace(req.Email)),
		FirstName: strings.TrimSpace(req.FirstName),
		LastName:  strings.TrimSpace(req.LastName),
		IsActive:  true,
	}

	if result := s.db.Create(&user); result.Error != nil {
		if strings.Contains(result.Error.Error(), "duplicate key") {
			http.Error(w, "Username or email already exists", http.StatusConflict)
		} else {
			http.Error(w, "Failed to create user", http.StatusInternalServerError)
			log.Printf("Error creating user: %v", result.Error)
		}
		return
	}

	// Broadcast new user to WebSocket clients
	s.broadcastMessage(map[string]interface{}{
		"type": "user_created",
		"data": user,
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func (s *Server) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade failed: %v", err)
		return
	}
	defer conn.Close()

	s.clients[conn] = true
	defer delete(s.clients, conn)

	log.Printf("WebSocket client connected. Total clients: %d", len(s.clients))

	// Send welcome message
	conn.WriteJSON(map[string]interface{}{
		"type":    "welcome",
		"message": "Connected to user management system",
	})

	// Keep connection alive and handle messages
	for {
		var msg map[string]interface{}
		if err := conn.ReadJSON(&msg); err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("WebSocket error: %v", err)
			}
			break
		}
		
		// Echo message back for demonstration
		conn.WriteJSON(map[string]interface{}{
			"type": "echo",
			"data": msg,
		})
	}
}

func (s *Server) broadcastMessage(message interface{}) {
	for conn := range s.clients {
		if err := conn.WriteJSON(message); err != nil {
			log.Printf("WebSocket broadcast error: %v", err)
			conn.Close()
			delete(s.clients, conn)
		}
	}
}

func (s *Server) handleHealthCheck(w http.ResponseWriter, r *http.Request) {
	status := map[string]interface{}{
		"status":    "healthy",
		"timestamp": time.Now().Unix(),
		"version":   "1.0.0",
	}
	
	// Check database connection
	if sqlDB, err := s.db.DB(); err == nil {
		if err := sqlDB.Ping(); err != nil {
			status["status"] = "unhealthy"
			status["database"] = "disconnected"
			w.WriteHeader(http.StatusServiceUnavailable)
		} else {
			status["database"] = "connected"
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(status)
}

func initDatabase() (*gorm.DB, error) {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=myapp port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Auto-migrate the schema
	if err := db.AutoMigrate(&User{}); err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}

	return db, nil
}

func main() {
	// Initialize database
	db, err := initDatabase()
	if err != nil {
		log.Fatal("Database initialization failed:", err)
	}

	// Create server
	server := NewServer(db)

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(server.router)

	// Setup HTTP server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	httpServer := &http.Server{
		Addr:    ":" + port,
		Handler: handler,
		// Good practice: enforce timeouts
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("🚀 Server starting on port %s", port)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Server failed to start:", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Graceful shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := httpServer.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exited")
}