use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::{Html, Json},
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Row};
use std::collections::HashMap;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;
use tracing::{info, warn, error};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct User {
    id: Uuid,
    username: String,
    email: String,
    created_at: chrono::DateTime<chrono::Utc>,
    is_active: bool,
}

#[derive(Debug, Deserialize)]
struct CreateUserRequest {
    username: String,
    email: String,
}

#[derive(Debug, Deserialize)]
struct QueryParams {
    page: Option<u32>,
    limit: Option<u32>,
    search: Option<String>,
}

#[derive(Clone)]
struct AppState {
    db: PgPool,
    config: AppConfig,
}

#[derive(Clone)]
struct AppConfig {
    port: u16,
    host: String,
    max_connections: u32,
}

async fn get_users(
    Query(params): Query<QueryParams>,
    State(state): State<AppState>,
) -> Result<Json<Vec<User>>, StatusCode> {
    let page = params.page.unwrap_or(1);
    let limit = params.limit.unwrap_or(10).min(100); // Cap at 100
    let offset = (page - 1) * limit;

    let mut query = "SELECT id, username, email, created_at, is_active FROM users WHERE is_active = true".to_string();
    
    if let Some(search) = params.search {
        query.push_str(&format!(" AND (username ILIKE '%{}%' OR email ILIKE '%{}%')", search, search));
    }
    
    query.push_str(&format!(" ORDER BY created_at DESC LIMIT {} OFFSET {}", limit, offset));

    match sqlx::query_as::<_, User>(&query).fetch_all(&state.db).await {
        Ok(users) => {
            info!("Retrieved {} users (page: {}, limit: {})", users.len(), page, limit);
            Ok(Json(users))
        }
        Err(e) => {
            error!("Database query failed: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn create_user(
    State(state): State<AppState>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<Json<User>, StatusCode> {
    // Validate input
    if payload.username.trim().is_empty() || payload.email.trim().is_empty() {
        warn!("Invalid user creation attempt: empty username or email");
        return Err(StatusCode::BAD_REQUEST);
    }

    let user = User {
        id: Uuid::new_v4(),
        username: payload.username.trim().to_string(),
        email: payload.email.trim().to_lowercase(),
        created_at: chrono::Utc::now(),
        is_active: true,
    };

    let result = sqlx::query!(
        r#"
        INSERT INTO users (id, username, email, created_at, is_active)
        VALUES ($1, $2, $3, $4, $5)
        "#,
        user.id,
        user.username,
        user.email,
        user.created_at,
        user.is_active
    )
    .execute(&state.db)
    .await;

    match result {
        Ok(_) => {
            info!("Created new user: {} ({})", user.username, user.email);
            Ok(Json(user))
        }
        Err(e) => {
            error!("Failed to create user: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn get_user_by_id(
    Path(user_id): Path<Uuid>,
    State(state): State<AppState>,
) -> Result<Json<User>, StatusCode> {
    match sqlx::query_as::<_, User>(
        "SELECT id, username, email, created_at, is_active FROM users WHERE id = $1 AND is_active = true"
    )
    .bind(user_id)
    .fetch_optional(&state.db)
    .await
    {
        Ok(Some(user)) => Ok(Json(user)),
        Ok(None) => Err(StatusCode::NOT_FOUND),
        Err(e) => {
            error!("Database query failed: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn health_check() -> &'static str {
    "OK"
}

fn create_app(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health_check))
        .route("/users", get(get_users).post(create_user))
        .route("/users/:id", get(get_user_by_id))
        .layer(CorsLayer::permissive())
        .with_state(state)
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::init();

    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgresql://localhost:5432/myapp".to_string());
    
    let pool = PgPool::connect(&database_url).await?;
    
    let config = AppConfig {
        port: std::env::var("PORT")
            .unwrap_or_else(|_| "3000".to_string())
            .parse()?,
        host: std::env::var("HOST")
            .unwrap_or_else(|_| "0.0.0.0".to_string()),
        max_connections: 100,
    };

    let state = AppState {
        db: pool,
        config: config.clone(),
    };

    let app = create_app(state);
    let addr = format!("{}:{}", config.host, config.port);
    let listener = TcpListener::bind(&addr).await?;

    info!("🚀 Server running on http://{}", addr);
    axum::serve(listener, app).await?;

    Ok(())
}