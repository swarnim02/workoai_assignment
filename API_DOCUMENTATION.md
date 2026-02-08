# API Documentation

## Base URL

**Local:** `http://localhost:3001`
**Production:** `https://workoai-assignment-fgnr.onrender.com`

## Authentication

### Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{ 
  "token": "jwt_token_string", 
  "user": { 
    "id": "user_id", 
    "name": "John Doe", 
    "email": "john@example.com", 
    "role": "user" 
  } 
}
```

### Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{ 
  "token": "jwt_token_string", 
  "user": { 
    "id": "user_id", 
    "name": "John Doe", 
    "email": "john@example.com", 
    "role": "user" 
  } 
}
```

## Candidates

All candidate endpoints require JWT authentication.

**Required Header:** `Authorization: Bearer <token>`

### Create Candidate
**Endpoint:** `POST /api/candidates`
**Access:** Users only (Admins cannot create referrals)

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "jobTitle": "Software Engineer",
  "resumeLink": "https://example.com/resume.pdf"
}
```

**Response:**
```json
{
  "_id": "candidate_id",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "jobTitle": "Software Engineer",
  "resumeLink": "https://example.com/resume.pdf",
  "status": "Pending",
  "referredBy": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Get All Candidates
**Endpoint:** `GET /api/candidates`
**Access:** All authenticated users

**Behavior:**
- Users see only their own referrals
- Admins see all referrals with referrer information

**Response:**
```json
[
  {
    "_id": "candidate_id",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "jobTitle": "Software Engineer",
    "resumeLink": "https://example.com/resume.pdf",
    "status": "Pending",
    "referredBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Update Candidate Status
**Endpoint:** `PUT /api/candidates/:id/status`
**Access:** Admin only

**Request Body:**
```json
{
  "status": "Reviewed"
}
```

**Valid Statuses:** `Pending`, `Reviewed`, `Hired`

**Response:**
```json
{
  "_id": "candidate_id",
  "name": "Jane Smith",
  "status": "Reviewed",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Delete Candidate
**Endpoint:** `DELETE /api/candidates/:id`
**Access:** Admin only

**Response:**
```json
{
  "message": "Candidate deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided" 
}
```

### 403 Forbidden
```json
{
  "error": "Only admins can update status"
}
```

### 404 Not Found
```json
{
  "error": "Candidate not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error"
}
```

## Validation Rules

### User Registration/Login
- **Name:** Required, string
- **Email:** Required, valid email format
- **Password:** Required, minimum 6 characters
- **Role:** Optional, either "user" or "admin" (defaults to "user")

### Candidate Creation
- **Name:** Required, string
- **Email:** Required, valid email format
- **Phone:** Required, exactly 10 digits
- **Job Title:** Required, string
- **Resume Link:** Optional, valid URL format
