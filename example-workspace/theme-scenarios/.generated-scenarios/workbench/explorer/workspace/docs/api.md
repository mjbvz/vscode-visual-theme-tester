# API Documentation

## Users API

### Get All Users
```
GET /api/users
```

Returns a list of all users in the system.

**Response:**
```json
[
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Create User
```
POST /api/users
```

Creates a new user.

**Request Body:**
```json
{
  "email": "string",
  "name": "string"
}
```