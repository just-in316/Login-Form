# Login Backend - Node.js with Express, MySQL, JWT & Bcrypt

A full-featured authentication backend built with Node.js, Express, MySQL2, bcrypt, and JWT.

## Features

- User registration with password hashing (bcrypt)
- User login with JWT token generation
- Password verification
- Protected routes with JWT middleware
- Password update functionality
- Token expiration
- CORS enabled
- Error handling

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

The `.env` file is already configured with default values:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=login_database
DB_PORT=3306
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=24h
```

> **Note:** Change `JWT_SECRET` to a secure value in production.

### 3. Setup Database

Make sure MySQL Server is running, then run:

```bash
node setup-database.js
```

This will:
- Create the `login_database` database
- Create the `users` table
- Create the `sessions` table (for optional token blacklisting)

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### Register a New User
```
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123"
}

Response (201):
{
    "message": "User registered successfully",
    "userId": 1
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}

Response (200):
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "email": "user@example.com"
    }
}
```

#### Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <token>

Response (200):
{
    "message": "Profile retrieved successfully",
    "user": {
        "id": 1,
        "email": "user@example.com",
        "created_at": "2026-03-06T10:30:00.000Z"
    }
}
```

#### Update Password (Protected)
```
PUT /api/auth/update-password
Authorization: Bearer <token>
Content-Type: application/json

{
    "oldPassword": "password123",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
}

Response (200):
{
    "message": "Password updated successfully"
}
```

#### Logout (Protected)
```
POST /api/auth/logout
Authorization: Bearer <token>

Response (200):
{
    "message": "Logout successful"
}
```

### Health Check
```
GET /api/health

Response (200):
{
    "message": "Server is running"
}
```

## Project Structure

```
.
├── config/
│   └── database.js           # MySQL connection pool
├── controllers/
│   └── authController.js     # Authentication business logic
├── middleware/
│   └── auth.js              # JWT verification middleware
├── routes/
│   └── auth.js              # Authentication routes
├── server.js                # Main Express app
├── setup-database.js        # Database initialization script
├── package.json             # Dependencies
├── .env                     # Environment variables
└── .gitignore              # Git ignore file
```

## Technologies Used

- **Express.js** - Web framework
- **MySQL2/Promise** - Database driver with promises
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token creation and verification
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing
- **body-parser** - JSON body parsing
- **nodemon** - Development auto-reload

## Error Handling

All endpoints return consistent error responses:

```json
{
    "error": "Error message",
    "message": "Detailed error information (development)"
}
```

## Security Notes

1. Always change `JWT_SECRET` in `.env` for production
2. Use HTTPS in production
3. Implement rate limiting for login attempts
4. Use HTTPS-only cookies for token storage
5. Never log passwords or sensitive data
6. Keep dependencies updated

## Development

To modify the code:

1. Backend logic: Edit files in `controllers/`, `routes/`, `middleware/`
2. Database queries: Modify `controllers/authController.js`
3. Add new routes: Create new files in `routes/` and import in `server.js`

## Troubleshooting

**Database Connection Error:**
- Ensure MySQL Server is running
- Check username and password in `.env`
- Verify database name in `.env`

**Port Already in Use:**
- Change `PORT` in `.env`
- Or kill the process using the port

**JWT Token Issues:**
- Ensure token is included in Authorization header
- Use format: `Authorization: Bearer <token>`
- Check token expiration

## License

ISC
