# 🔐 Authentication & Authorization System

## Overview

This project implements a secure Role-Based Access Control (RBAC) authentication system with JWT tokens, distinguishing between **Customers (users)** and **Admins**.

## 🛡️ Security Features

### Critical Security Rules
- ✅ **Public Registration**: Only creates 'user' role accounts
- 🚫 **Admin Registration**: Blocked from public UI - must be created via seed script
- 🔒 **Password Security**: All passwords are hashed using `bcryptjs`
- 🎫 **Session Management**: Stateless authentication using JWT tokens
- 🔐 **Protected Routes**: Admin-only endpoints require valid JWT + admin role

---

## 📁 File Structure

### Backend
```
server/
├── models/
│   └── User.js                    # User schema with bcrypt hashing
├── controllers/
│   └── authController.js          # Register, login, getMe functions
├── middleware/
│   └── authMiddleware.js          # verifyToken & verifyAdmin guards
├── routes/
│   ├── authRoutes.js              # /api/auth routes
│   └── menuRoutes.js              # Protected with admin middleware
└── seedAdmin.js                   # Admin user seeder script
```

### Frontend
```
client/src/
├── context/
│   └── AuthContext.jsx            # Global auth state management
├── components/
│   ├── PrivateRoute.jsx           # Route protection wrapper
│   └── Navbar.jsx                 # Auth UI (login/logout/admin button)
├── pages/
│   ├── Login.jsx                  # Login page
│   └── Register.jsx               # Registration page (users only)
└── store/
    └── menuStore.js               # Updated with auth headers
```

---

## 🚀 Getting Started

### 1. Create Admin Account

Before you can access admin features, create an admin account:

```bash
node server/seedAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@lvc.com`
- Password: `admin123`

⚠️ **Important**: Change the password after first login!

### 2. Environment Variables

Ensure you have a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

### 3. Start the Application

```bash
npm run dev
```

---

## 🔑 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user (role: 'user' only) |
| POST | `/api/auth/login` | Public | Login user/admin, returns JWT |
| GET | `/api/auth/me` | Protected | Get current user profile |

### Menu Routes (`/api/menu`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/menu` | Public | Get all menu items |
| GET | `/api/menu/:id` | Public | Get single menu item |
| POST | `/api/menu` | **Admin Only** | Create menu item |
| PUT | `/api/menu/:id` | **Admin Only** | Update menu item |
| DELETE | `/api/menu/:id` | **Admin Only** | Delete menu item |

---

## 📝 Usage Examples

### Register a New Customer

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@lvc.com",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin",
    "email": "admin@lvc.com",
    "role": "admin"
  }
}
```

### Create Menu Item (Admin Only)

**Request:**
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Carne Asada Taco",
    "description": "Grilled steak taco",
    "price": 3.99,
    "category": "Tacos"
  }'
```

**Error Response (Non-Admin):**
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

---

## 🎨 Frontend Integration

### Using the AuthContext

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAdmin, login, logout, register } = useAuth();

  // Check if user is logged in
  if (!user) {
    return <p>Please log in</p>;
  }

  // Check if user is admin
  if (isAdmin) {
    return <AdminPanel />;
  }

  return <UserDashboard />;
}
```

### Protecting Routes

```jsx
// Protect admin-only routes
<Route
  path="/admin/dashboard"
  element={
    <PrivateRoute adminOnly={true}>
      <AdminDashboard />
    </PrivateRoute>
  }
/>

// Protect any authenticated route
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <UserProfile />
    </PrivateRoute>
  }
/>
```

---

## 🔒 User Model Schema

```javascript
{
  name: String,           // User's full name
  email: String,          // Unique, lowercase email
  password: String,       // Hashed with bcrypt (10 rounds)
  role: String,           // 'user' | 'admin' (default: 'user')
  createdAt: Date,        // Auto-generated timestamp
  updatedAt: Date         // Auto-generated timestamp
}
```

---

## 🧪 Testing the System

### Test User Registration
1. Go to `http://localhost:5173/register`
2. Fill in the form
3. Check that the user is created with `role: 'user'`

### Test Admin Login
1. Run `node server/seedAdmin.js`
2. Go to `http://localhost:5173/login`
3. Login with `admin@lvc.com` / `admin123`
4. Verify "Admin Dashboard" button appears in navbar

### Test Admin Protection
1. Login as a regular user
2. Try to access `http://localhost:5173/admin/dashboard`
3. Should be redirected to home page

---

## ⚠️ Important Security Notes

1. **JWT_SECRET**: Change this in production to a strong, random string
2. **HTTPS**: Always use HTTPS in production
3. **Password Policy**: Consider adding stronger password requirements
4. **Rate Limiting**: Add rate limiting to prevent brute force attacks
5. **Admin Password**: Change the default admin password immediately after first use

---

## 🐛 Troubleshooting

### "Token is invalid or expired"
- Token may have expired (30-day default)
- User may have been deleted from database
- Solution: Logout and login again

### "Access denied. Admin privileges required"
- User is not logged in, or
- User role is 'user' (not 'admin')
- Solution: Login with admin credentials

### Admin Seeder Already Exists
- Admin user already created
- Check output for admin email and ID
- Use existing credentials or delete user from DB to re-seed

---

## 📚 Next Steps

Consider implementing:
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Refresh tokens
- [ ] Two-factor authentication (2FA)
- [ ] Session management (logout all devices)
- [ ] User profile editing
- [ ] Admin user management panel

---

## 🤝 Contributing

When adding new protected routes:
1. Import middleware: `import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';`
2. Apply to route: `router.post('/endpoint', verifyToken, verifyAdmin, controller);`
3. Update frontend to send Authorization header

---

**Built with ❤️ for La Vera Cruzana**
