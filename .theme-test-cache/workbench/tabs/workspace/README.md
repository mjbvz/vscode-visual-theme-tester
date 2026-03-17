# Express TypeScript Application

A modern Express.js application built with TypeScript.

## Features

- **TypeScript** support for type safety
- **Express.js** web framework
- **RESTful API** endpoints
- **Database integration** with connection pooling
- **Environment configuration** with dotenv
- **Development tools** with hot reload

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Database (PostgreSQL/MySQL)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd express-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## API Endpoints

- `GET /` - Health check endpoint
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
src/
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # Data models
├── middleware/     # Custom middleware
└── utils/          # Utility functions
```