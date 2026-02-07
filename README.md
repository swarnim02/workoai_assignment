# Candidate Referral Management System

A full-stack application for managing candidate referrals with React frontend and Node.js backend.

## Features Implemented

### Frontend (React)
- ✅ Dashboard displaying all referred candidates
- ✅ Search functionality by job title or status
- ✅ Referral form with validation
- ✅ Status update (Pending → Reviewed → Hired)
- ✅ Delete candidate functionality
- ✅ Resume upload (PDF only, stored as base64 in database)
- ✅ Responsive design
- ✅ JWT Authentication (Login/Register)
- ✅ Protected routes

### Backend (Node.js + Express)
- ✅ POST /api/auth/register - User registration
- ✅ POST /api/auth/login - User login
- ✅ POST /api/candidates - Create new candidate (protected)
- ✅ GET /api/candidates - Fetch all candidates (protected)
- ✅ PUT /api/candidates/:id/status - Update candidate status (protected)
- ✅ DELETE /api/candidates/:id - Delete candidate (protected)
- ✅ MongoDB (NoSQL) database
- ✅ Email and phone validation
- ✅ PDF file validation
- ✅ Error handling
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt

## Tech Stack

**Frontend:**
- React 18
- React Hooks (useState, useEffect)
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- Bcrypt for password hashing
- CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd project_workoai
```

### 2. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/candidate_referral
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or start manually
mongod
```

### 5. Run the application

**Terminal 1 - Backend:**
```bash
npm start
# Server will run on http://localhost:5001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# React app will run on http://localhost:3000
```

## API Endpoints

### Authentication

#### 1. Register User
- **URL:** `POST /api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User
- **URL:** `POST /api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Candidates (All routes require JWT token in Authorization header)

#### 3. Create Candidate
- **URL:** `POST /api/candidates`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "jobTitle": "Software Engineer",
  "resumeData": "base64_encoded_pdf",
  "resumeName": "resume.pdf"
}
```

#### 4. Get All Candidates
- **URL:** `GET /api/candidates`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of candidates

#### 5. Update Status
- **URL:** `PUT /api/candidates/:id/status`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "status": "Reviewed"
}
```

#### 6. Delete Candidate
- **URL:** `DELETE /api/candidates/:id`
- **Headers:** `Authorization: Bearer <token>`

## Validation Rules

- **Name:** Required for registration
- **Email:** Must be valid email format
- **Password:** Minimum 6 characters
- **Phone:** Must be 10 digits
- **Resume:** Only PDF files accepted
- **Status:** Must be one of: Pending, Reviewed, Hired

## Project Structure

```
project_workoai/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── candidateController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Candidate.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── candidateRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.js
│   │   │   ├── Dashboard.js
│   │   │   └── ReferralForm.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Assumptions & Limitations

1. **Resume Storage:** Resumes are stored as base64 in MongoDB (not cloud storage)
2. **Authentication:** JWT-based authentication with 7-day token expiry
3. **Password Security:** Passwords hashed using bcrypt with salt rounds of 10
4. **Phone Format:** Assumes 10-digit phone numbers
5. **File Size:** Limited to 10MB for resume uploads
6. **Local Development:** Configured for local MongoDB instance
7. **Token Storage:** JWT tokens stored in localStorage

## Future Enhancements (Bonus)

- [x] JWT authentication
- [ ] Cloud storage for resumes (AWS S3)
- [ ] Metrics dashboard
- [ ] Deployment to cloud platform
- [ ] Email notifications
- [ ] Pagination for large datasets
- [ ] Refresh token mechanism
- [ ] Password reset functionality

## Testing

Use the provided Postman collection (`postman_collection.json`) to test all API endpoints.

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file

**CORS Error:**
- Backend must be running on port 5001
- Frontend must be running on port 3000

**Port Already in Use:**
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

## Author

Created for Worko Assignment

## License

MIT
