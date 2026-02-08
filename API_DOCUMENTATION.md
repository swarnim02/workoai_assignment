# API Endpoints

Base URL: `http://localhost:3001`

## Authentication

### Register
`POST /api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

Returns: `{ token, user: { id, name, email, role } }`

### Login
`POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns: `{ token, user: { id, name, email, role } }`

## Candidates (Protected - requires JWT token)

Add header: `Authorization: Bearer <token>`

### Create Candidate
`POST /api/candidates`

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "jobTitle": "Software Engineer",
  "resumeData": "base64_string",
  "resumeName": "resume.pdf"
}
```

### Get All Candidates
`GET /api/candidates`

Users see only their referrals. Admins see all with referrer info.

### Update Status (Admin only)
`PUT /api/candidates/:id/status`

```json
{
  "status": "Reviewed"
}
```

Valid statuses: Pending, Reviewed, Hired

### Delete Candidate (Admin only)
`DELETE /api/candidates/:id`

## Validation

- Email: valid format
- Phone: exactly 10 digits
- Password: min 6 characters
- Resume: PDF only
- Role: user or admin
