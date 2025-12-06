# 🌮 StreetEats - Food Truck Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

A full-stack MERN application for **La Vera Cruzana Mexican Food Truck** featuring secure authentication, role-based access control, and comprehensive menu management.

![StreetEats Demo](https://via.placeholder.com/800x400/f59e0b/ffffff?text=StreetEats+-+Food+Truck+Platform)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** with 30-day token expiry
- **Role-Based Access Control (RBAC)** - Customer vs Admin roles
- **Secure Password Hashing** using bcryptjs (10 rounds)
- **Protected API Routes** with middleware authorization
- **Admin-only Registration** via seed script (no public admin signup)

### 🍽️ Menu Management
- **Full CRUD Operations** for menu items (Admin only)
- **Real-time Updates** with Zustand state management
- **Category Filtering** (Tacos, Gorditas, Sopes, Drinks, Specials)
- **Featured Items** and availability status
- **Responsive Design** with Tailwind CSS

### 🎨 User Experience
- **Framer Motion Animations** for smooth transitions
- **Business Hours Display** with real-time status updates
- **Mobile-First Design** with responsive navigation
- **Loading States** and error handling
- **Contact Form** integration

### 📱 Admin Dashboard
- Create, update, and delete menu items
- Toggle item availability
- Manage featured items
- Real-time preview of changes
- Professional data tables with search/filter

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/CS-Fasih/StreetEats-MERN.git
cd StreetEats-MERN
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/la_vera_cruzana
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

4. **Create admin account**
```bash
npm run seed:admin
```

5. **Start the application**
```bash
npm run dev
```

6. **Access the application**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Default Credentials
- **Admin Email:** `admin@lvc.com`
- **Password:** `admin123`

⚠️ **Important:** Change the default password after first login!

## 📁 Project Structure

```
StreetEats-MERN/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth, Order)
│   │   ├── store/         # Zustand stores
│   │   └── utils/         # Helper functions
│   ├── public/
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── seed.js           # Menu data seeder
│   ├── seedAdmin.js      # Admin user seeder
│   └── server.js         # Entry point
├── .env                  # Environment variables
├── package.json          # Root package.json
└── README.md
```

## 🔒 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user/admin |
| GET | `/api/auth/me` | Protected | Get current user |

### Menu
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/menu` | Public | Get all menu items |
| GET | `/api/menu/:id` | Public | Get single item |
| POST | `/api/menu` | Admin Only | Create menu item |
| PUT | `/api/menu/:id` | Admin Only | Update menu item |
| DELETE | `/api/menu/:id` | Admin Only | Delete menu item |

### Contact
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/contact` | Public | Submit contact form |

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🎯 Key Features Implementation

### Authentication Flow
```javascript
User Registration → Password Hashing → JWT Generation → Auto-Login
User Login → Credential Validation → JWT Token → State Update
Protected Route → Token Verification → Role Check → Access Granted/Denied
```

### Security Measures
- ✅ Passwords never stored in plain text
- ✅ JWT tokens with expiration
- ✅ Admin role verification middleware
- ✅ Frontend route protection
- ✅ CORS configured
- ✅ Environment variable protection

## 📚 Documentation

Comprehensive documentation is available:
- **[AUTH_DOCUMENTATION.md](AUTH_DOCUMENTATION.md)** - Complete authentication guide
- **[AUTH_ARCHITECTURE.md](AUTH_ARCHITECTURE.md)** - System architecture & flows
- **[QUICK_START_AUTH.md](QUICK_START_AUTH.md)** - Quick start guide
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Project organization

## 🧪 Testing

### Manual Testing
1. Register a new user account
2. Login as admin (`admin@lvc.com` / `admin123`)
3. Access admin dashboard
4. Create, update, delete menu items
5. Test access control (try accessing admin routes as regular user)

### API Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lvc.com","password":"admin123"}'
```

**Create Menu Item:**
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Carne Asada Taco",
    "description": "Grilled steak taco",
    "price": 3.99,
    "category": "Tacos"
  }'
```

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Update MongoDB URI to production database
3. Change JWT_SECRET to strong random string
4. Deploy using platform CLI or GitHub integration

### Frontend (Vercel/Netlify)
1. Update API URL in production
2. Build: `npm run build` in client directory
3. Deploy `client/dist` folder

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Fasih**
- GitHub: [@CS-Fasih](https://github.com/CS-Fasih)

## 🙏 Acknowledgments

- Built for **La Vera Cruzana Mexican Food Truck**
- Inspired by modern food delivery platforms
- UI/UX best practices from leading web applications

## 📞 Support

For support, email or open an issue in the repository.

---

**⭐ Star this repository if you find it helpful!**

Built with ❤️ using the MERN stack
