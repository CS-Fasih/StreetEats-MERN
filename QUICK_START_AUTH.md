# 🚀 Quick Start Guide - Authentication System

## ⚡ Get Started in 3 Minutes

### Step 1: Create Admin Account (30 seconds)

```bash
npm run seed:admin
```

You should see:
```
✅ Admin user created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: admin@lvc.com
🔑 Password: admin123
👤 Role: admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 2: Start the Server (10 seconds)

```bash
npm run dev
```

Wait for:
```
✅ MongoDB Connected Successfully
Server running on http://localhost:5000
Vite dev server running on http://localhost:5173
```

### Step 3: Test the System (2 minutes)

#### 🧪 Test 1: Admin Login (30 seconds)
1. Open browser: `http://localhost:5173/login`
2. Enter:
   - Email: `admin@lvc.com`
   - Password: `admin123`
3. Click "Login"
4. ✅ Should see "Admin Dashboard" button in navbar

#### 🧪 Test 2: Admin Powers (30 seconds)
1. Click "Admin Dashboard" button
2. Try adding a menu item
3. ✅ Should successfully create the item

#### 🧪 Test 3: User Registration (30 seconds)
1. Logout (click logout button)
2. Go to: `http://localhost:5173/register`
3. Fill the form with any details
4. ✅ Should be logged in as regular user
5. ✅ NO "Admin Dashboard" button visible

#### 🧪 Test 4: Access Control (30 seconds)
1. While logged in as regular user
2. Try accessing: `http://localhost:5173/admin/dashboard`
3. ✅ Should be redirected to home page

---

## 📚 Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| **AUTH_SUMMARY.md** | High-level overview | Start here! |
| **AUTH_DOCUMENTATION.md** | Complete API reference | When integrating |
| **AUTH_ARCHITECTURE.md** | Visual diagrams | Understanding flows |
| **AUTH_CHECKLIST.md** | Verification list | Testing & QA |
| **QUICK_START_AUTH.md** | This file | Getting started |

---

## 🎯 Common Tasks

### Create More Admin Users

Edit `server/seedAdmin.js` and change the email, then run:
```bash
npm run seed:admin
```

### Test API with cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lvc.com","password":"admin123"}'
```

**Create Menu Item (use token from login response):**
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Taco",
    "description": "Delicious test",
    "price": 3.99,
    "category": "Tacos"
  }'
```

### Change Admin Password

1. Login as admin
2. Open browser console
3. Run:
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(console.log);
```
4. Note your user ID
5. Update in MongoDB directly or create a password change endpoint

---

## 🛑 Troubleshooting

### ❌ "MongoDB Connection Error"
**Fix:** Make sure MongoDB is running:
```bash
# On Linux
sudo systemctl start mongod

# Or if using Docker
docker start mongodb
```

### ❌ "Admin user already exists"
**This is OK!** Use the existing credentials:
- Email: `admin@lvc.com`
- Password: `admin123`

### ❌ "Token is invalid or expired"
**Fix:** Logout and login again:
1. Click logout button
2. Go to login page
3. Enter credentials

### ❌ Can't access admin dashboard
**Check:**
1. Are you logged in? (Look for logout button)
2. Is "Admin Dashboard" button visible?
3. If no button, you're not logged in as admin

### ❌ "Access denied. Admin privileges required"
**Reason:** You're trying admin operations as a regular user

**Fix:** Login with admin credentials

---

## 🎨 UI Features

### Navbar Changes Based on Auth State

**Not Logged In:**
```
[Logo]  Home  Menu  Contact          [Login]  [Register]
```

**Logged In (Regular User):**
```
[Logo]  Home  Menu  Contact    Welcome, John  [Logout]
```

**Logged In (Admin):**
```
[Logo]  Home  Menu  Contact    Welcome, Admin  [Admin Dashboard]  [Logout]
```

---

## 🔒 Default Accounts

After running `npm run seed:admin`:

| Email | Password | Role | Can Do |
|-------|----------|------|---------|
| admin@lvc.com | admin123 | admin | Everything |

Create user accounts via the `/register` page.

---

## 📱 Testing Checklist

Copy and paste this checklist:

```
Authentication Testing

□ Run seed:admin script
□ Admin account created successfully
□ Start server with npm run dev
□ Server starts without errors

Login Tests
□ Login as admin works
□ Admin Dashboard button appears
□ Login with wrong password fails
□ Login with non-existent email fails

Registration Tests
□ Register new user works
□ User is auto-logged in after registration
□ Cannot register with existing email

Admin Features
□ Can access /admin/dashboard
□ Can create menu items
□ Can update menu items
□ Can delete menu items

Access Control
□ Regular user cannot access /admin/dashboard
□ Regular user gets 403 on admin API calls
□ Logout button works
□ After logout, cannot access protected pages

Persistence
□ Refresh page while logged in
□ Still logged in after refresh
□ Admin button still visible (if admin)
```

---

## 🎓 Learning Resources

### Understanding JWT
```javascript
// JWT Structure: header.payload.signature
// Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  // Header (algorithm)
eyJpZCI6IjEyMzQ1Njc4OTAifQ.            // Payload (user data)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV     // Signature (verified)
```

### Understanding Middleware
```javascript
// Request Flow:
Request 
  → verifyToken (checks if logged in)
    → verifyAdmin (checks if admin)
      → Controller (executes action)
```

### Understanding RBAC
```javascript
// Role-Based Access Control:
User {
  role: 'user'   // Can view menu
}

Admin {
  role: 'admin'  // Can view + edit menu
}
```

---

## 💡 Pro Tips

1. **Always use admin account for testing admin features**
   - Don't waste time trying to access admin pages as regular user

2. **Check the browser console for errors**
   - Press F12 → Console tab
   - Look for error messages

3. **Check network tab to see API calls**
   - F12 → Network tab
   - See all requests and responses

4. **Logout and login if something seems wrong**
   - Token might be expired or corrupted

5. **Use the demo credentials shown on login page**
   - They're there for convenience!

---

## 🚀 Next Steps

1. ✅ Complete the testing checklist above
2. 📖 Read `AUTH_DOCUMENTATION.md` for API details
3. 🎨 Customize the login/register pages
4. 🔐 Change the admin password
5. 🌟 Add more features (password reset, etc.)

---

## 📞 Need Help?

1. **Read the error message carefully**
   - Most errors are self-explanatory

2. **Check the documentation**
   - `AUTH_DOCUMENTATION.md` has detailed info

3. **Verify environment variables**
   - Check `.env` file exists
   - Has `JWT_SECRET` set

4. **Check server logs**
   - Look at terminal where `npm run dev` is running

---

## ✨ You're Ready!

Everything is set up and working. Start testing and enjoy your secure application! 🎉

**Quick reminder:**
- Admin: `admin@lvc.com` / `admin123`
- Docs: See `AUTH_DOCUMENTATION.md`
- Help: Check `AUTH_ARCHITECTURE.md` for flows

**Happy coding! 🚀**
