# 🔐 Authentication System Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (React + Vite)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐          ┌──────────────────┐                     │
│  │   AuthContext   │◄─────────│  localStorage    │                     │
│  │  (Global State) │          │  - token         │                     │
│  └────────┬────────┘          │  - user          │                     │
│           │                   └──────────────────┘                     │
│           │                                                             │
│           ├──► Login.jsx                                               │
│           ├──► Register.jsx                                            │
│           ├──► Navbar.jsx (shows Login/Logout/Admin)                   │
│           └──► PrivateRoute.jsx (protects routes)                      │
│                                                                          │
│  ┌──────────────────────────────────────────────────┐                  │
│  │              menuStore (Zustand)                 │                  │
│  │  - Adds "Authorization: Bearer <token>" header   │                  │
│  │  - to all admin operations (POST/PUT/DELETE)     │                  │
│  └──────────────────────────────────────────────────┘                  │
│                                                                          │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            │ (with JWT in header)
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     SERVER (Express + MongoDB)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │                    API Routes                              │        │
│  ├────────────────────────────────────────────────────────────┤        │
│  │                                                             │        │
│  │  /api/auth                                                  │        │
│  │    ├─ POST /register  → authController.register            │        │
│  │    ├─ POST /login     → authController.login               │        │
│  │    └─ GET  /me        → [verifyToken] → authController.getMe│       │
│  │                                                             │        │
│  │  /api/menu                                                  │        │
│  │    ├─ GET    /        → menuController.getAllMenuItems     │        │
│  │    ├─ GET    /:id     → menuController.getMenuItemById     │        │
│  │    ├─ POST   /        → [verifyToken][verifyAdmin] → create│        │
│  │    ├─ PUT    /:id     → [verifyToken][verifyAdmin] → update│        │
│  │    └─ DELETE /:id     → [verifyToken][verifyAdmin] → delete│        │
│  │                                                             │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │                 Middleware Layer                           │        │
│  ├────────────────────────────────────────────────────────────┤        │
│  │                                                             │        │
│  │  verifyToken (authMiddleware.js)                           │        │
│  │    1. Extract token from "Authorization: Bearer <token>"   │        │
│  │    2. Verify JWT signature with JWT_SECRET                 │        │
│  │    3. Decode user ID from token                            │        │
│  │    4. Fetch user from database                             │        │
│  │    5. Attach user to req.user                              │        │
│  │    6. Call next() or return 401                            │        │
│  │                                                             │        │
│  │  verifyAdmin (authMiddleware.js)                           │        │
│  │    1. Check if req.user exists                             │        │
│  │    2. Check if req.user.role === 'admin'                   │        │
│  │    3. Call next() or return 403                            │        │
│  │                                                             │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │                 Controllers                                │        │
│  ├────────────────────────────────────────────────────────────┤        │
│  │                                                             │        │
│  │  authController.register                                   │        │
│  │    1. Validate input (name, email, password)               │        │
│  │    2. Check if user exists                                 │        │
│  │    3. Create user with role='user' (FORCED)                │        │
│  │    4. Password auto-hashed by User model pre-save hook     │        │
│  │    5. Generate JWT token                                   │        │
│  │    6. Return { token, user }                               │        │
│  │                                                             │        │
│  │  authController.login                                      │        │
│  │    1. Validate input (email, password)                     │        │
│  │    2. Find user by email (include password field)          │        │
│  │    3. Compare password with user.comparePassword()         │        │
│  │    4. Generate JWT token                                   │        │
│  │    5. Return { token, user }                               │        │
│  │                                                             │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │                    Models                                  │        │
│  ├────────────────────────────────────────────────────────────┤        │
│  │                                                             │        │
│  │  User Model (User.js)                                      │        │
│  │    Fields:                                                 │        │
│  │      - name: String                                        │        │
│  │      - email: String (unique, lowercase)                   │        │
│  │      - password: String (hashed, select: false)            │        │
│  │      - role: 'user' | 'admin' (default: 'user')            │        │
│  │                                                             │        │
│  │    Hooks:                                                  │        │
│  │      - pre('save'): Hash password with bcrypt              │        │
│  │                                                             │        │
│  │    Methods:                                                │        │
│  │      - comparePassword(candidatePassword)                  │        │
│  │      - toJSON(): Exclude password from response            │        │
│  │                                                             │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
└───────────────────────────┬──────────────────────────────────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │   MongoDB       │
                   │   Database      │
                   │                 │
                   │  Collections:   │
                   │   - users       │
                   │   - menuitems   │
                   └─────────────────┘
```

---

## 🔄 Authentication Flows

### 1️⃣ User Registration Flow

```
┌─────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User   │         │  React   │         │  Express │         │ MongoDB  │
└────┬────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                   │                     │                    │
     │ Fill form         │                     │                    │
     ├──────────────────►│                     │                    │
     │                   │                     │                    │
     │ Submit            │ POST /api/auth/     │                    │
     ├──────────────────►│    register         │                    │
     │                   ├────────────────────►│                    │
     │                   │                     │                    │
     │                   │   {name, email,     │                    │
     │                   │    password}        │                    │
     │                   │                     │                    │
     │                   │                     │ Check if exists    │
     │                   │                     ├───────────────────►│
     │                   │                     │◄───────────────────┤
     │                   │                     │                    │
     │                   │                     │ Create user        │
     │                   │                     │ role='user'        │
     │                   │                     ├───────────────────►│
     │                   │                     │                    │
     │                   │                     │ (password hashed   │
     │                   │                     │  by pre-save hook) │
     │                   │                     │                    │
     │                   │                     │◄───────────────────┤
     │                   │                     │                    │
     │                   │  Generate JWT       │                    │
     │                   │  token (30d expiry) │                    │
     │                   │                     │                    │
     │                   │◄────────────────────┤                    │
     │                   │ {token, user}       │                    │
     │                   │                     │                    │
     │  Store in         │                     │                    │
     │  localStorage     │                     │                    │
     │  & state          │                     │                    │
     │◄──────────────────┤                     │                    │
     │                   │                     │                    │
     │ Redirect to /menu │                     │                    │
     │◄──────────────────┤                     │                    │
     │                   │                     │                    │
```

---

### 2️⃣ Login Flow

```
┌─────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User   │         │  React   │         │  Express │         │ MongoDB  │
└────┬────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                   │                     │                    │
     │ Enter email/pwd   │                     │                    │
     ├──────────────────►│                     │                    │
     │                   │                     │                    │
     │ Submit            │ POST /api/auth/     │                    │
     ├──────────────────►│    login            │                    │
     │                   ├────────────────────►│                    │
     │                   │ {email, password}   │                    │
     │                   │                     │                    │
     │                   │                     │ Find user by email │
     │                   │                     ├───────────────────►│
     │                   │                     │◄───────────────────┤
     │                   │                     │ (with password)    │
     │                   │                     │                    │
     │                   │                     │ Compare password   │
     │                   │                     │ using bcrypt       │
     │                   │                     │                    │
     │                   │                     │ If valid:          │
     │                   │                     │ Generate JWT       │
     │                   │                     │                    │
     │                   │◄────────────────────┤                    │
     │                   │ {token, user}       │                    │
     │                   │                     │                    │
     │  Store in         │                     │                    │
     │  localStorage     │                     │                    │
     │◄──────────────────┤                     │                    │
     │                   │                     │                    │
     │ Update UI:        │                     │                    │
     │ - Show logout btn │                     │                    │
     │ - Show admin btn  │                     │                    │
     │   (if admin)      │                     │                    │
     │◄──────────────────┤                     │                    │
     │                   │                     │                    │
```

---

### 3️⃣ Protected Route Access (Admin)

```
┌─────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  Admin  │         │  React   │         │  Express │         │ MongoDB  │
└────┬────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                   │                     │                    │
     │ Create menu item  │                     │                    │
     ├──────────────────►│                     │                    │
     │                   │                     │                    │
     │                   │ POST /api/menu      │                    │
     │                   │ Authorization:      │                    │
     │                   │  Bearer <token>     │                    │
     ├──────────────────►├────────────────────►│                    │
     │                   │ {item data}         │                    │
     │                   │                     │                    │
     │                   │                     │ [verifyToken]      │
     │                   │                     │ 1. Extract token   │
     │                   │                     │ 2. Verify JWT      │
     │                   │                     │ 3. Get user ID     │
     │                   │                     │                    │
     │                   │                     │ Fetch user         │
     │                   │                     ├───────────────────►│
     │                   │                     │◄───────────────────┤
     │                   │                     │                    │
     │                   │                     │ [verifyAdmin]      │
     │                   │                     │ Check role='admin' │
     │                   │                     │                    │
     │                   │                     │ ✓ Authorized       │
     │                   │                     │                    │
     │                   │                     │ Create menu item   │
     │                   │                     ├───────────────────►│
     │                   │                     │◄───────────────────┤
     │                   │                     │                    │
     │                   │◄────────────────────┤                    │
     │                   │ {success, data}     │                    │
     │                   │                     │                    │
     │ Update UI         │                     │                    │
     │◄──────────────────┤                     │                    │
     │                   │                     │                    │
```

---

### 4️⃣ Blocked Access (Non-Admin)

```
┌─────────┐         ┌──────────┐         ┌──────────┐
│  User   │         │  React   │         │  Express │
└────┬────┘         └────┬─────┘         └────┬─────┘
     │                   │                     │
     │ Try create item   │                     │
     ├──────────────────►│                     │
     │                   │                     │
     │                   │ POST /api/menu      │
     │                   │ Authorization:      │
     │                   │  Bearer <token>     │
     ├──────────────────►├────────────────────►│
     │                   │                     │
     │                   │                     │ [verifyToken] ✓
     │                   │                     │ User authenticated
     │                   │                     │
     │                   │                     │ [verifyAdmin]
     │                   │                     │ role='user' ✗
     │                   │                     │
     │                   │◄────────────────────┤
     │                   │ 403 Forbidden       │
     │                   │ "Admin privileges   │
     │                   │  required"          │
     │                   │                     │
     │ Show error        │                     │
     │◄──────────────────┤                     │
     │                   │                     │
```

---

## 🎯 Security Checkpoints

### Registration Checkpoint
```
User Input ──► Validation ──► Email Unique? ──► Force role='user' ──► Hash Password ──► Save
                    │               │                    │                   │
                    ▼               ▼                    ▼                   ▼
              All fields?      Not exists?        ALWAYS 'user'        bcrypt (10 rounds)
                    │               │                    │                   │
                    ✗               ✗                    │                   │
                    │               │                    │                   │
              400 Error       400 Error                  └─────────► 201 Created
```

### Login Checkpoint
```
Credentials ──► Find User ──► Password Match? ──► Generate JWT ──► Return Token
                    │               │                    │
                    ▼               ▼                    ▼
                Exists?       bcrypt.compare()      sign({id}, secret)
                    │               │                    │
                    ✗               ✗                    │
                    │               │                    │
              401 Error       401 Error                  └────► 200 Success
```

### Protected Route Checkpoint
```
Request ──► Has Token? ──► Valid JWT? ──► User Exists? ──► Admin Role? ──► Execute
                │              │              │                │
                ▼              ▼              ▼                ▼
              Exists?      jwt.verify()    DB lookup      role='admin'?
                │              │              │                │
                ✗              ✗              ✗                ✗
                │              │              │                │
           401 Error      401 Error      401 Error        403 Forbidden
```

---

## 📊 Role Permission Matrix

| Action | Public | User (Authenticated) | Admin |
|--------|--------|---------------------|-------|
| View Menu Items | ✅ | ✅ | ✅ |
| Register Account | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |
| View Profile | ❌ | ✅ | ✅ |
| Create Menu Item | ❌ | ❌ | ✅ |
| Update Menu Item | ❌ | ❌ | ✅ |
| Delete Menu Item | ❌ | ❌ | ✅ |
| Access Admin Dashboard | ❌ | ❌ | ✅ |

---

**Architecture Complete! 🎉**
