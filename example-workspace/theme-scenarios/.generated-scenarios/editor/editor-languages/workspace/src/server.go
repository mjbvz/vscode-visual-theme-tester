package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

type Server struct {
	users map[int]*User
	port  int
}

func NewServer(port int) *Server {
	return &Server{
		users: make(map[int]*User),
		port:  port,
	}
}

func (s *Server) createUserHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	user.ID = len(s.users) + 1
	user.CreatedAt = time.Now()
	s.users[user.ID] = &user

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (s *Server) getUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	user, exists := s.users[id]
	if !exists {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (s *Server) Start() {
	r := mux.NewRouter()
	r.HandleFunc("/users", s.createUserHandler).Methods("POST")
	r.HandleFunc("/users/{id}", s.getUserHandler).Methods("GET")

	log.Printf("Server starting on port %d", s.port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", s.port), r))
}