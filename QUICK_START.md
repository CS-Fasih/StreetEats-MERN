# 🌮 La Vera Cruzana - Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## Installation Steps

### Option 1: Automated Setup (Recommended)

1. **Navigate to the project directory:**
   ```bash
   cd LA_VERA_CRUZANA
   ```

2. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

   This will:
   - Install all dependencies (root and client)
   - Seed the database with sample menu items
   - Prepare the project for development

### Option 2: Manual Setup

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Configure environment variables:**
   - Open `.env` file
   - Update `MONGODB_URI` if using MongoDB Atlas or a different connection string

4. **Seed the database:**
   ```bash
   node server/seed.js
   ```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- **Backend server** at `http://localhost:5000`
- **Frontend client** at `http://localhost:5173`

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Accessing the Application

- 🏠 **Homepage:** http://localhost:5173
- 📋 **Menu Page:** http://localhost:5173/menu
- 📧 **Contact Page:** http://localhost:5173/contact
- 👨‍💼 **Admin Dashboard:** http://localhost:5173/admin/dashboard

## Admin Dashboard Usage

The admin dashboard allows you to:
- ✅ Create new menu items
- ✏️ Edit existing items (name, price, description, etc.)
- 🗑️ Delete items
- 👁️ Toggle availability status
- ⭐ Mark items as featured

### To use the admin dashboard:
1. Navigate to `/admin/dashboard`
2. Click "Add New Item" to create menu items
3. Use the edit/delete buttons on each item for management

## API Endpoints

### Menu Management
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Create new item
- `PUT /api/menu/:id` - Update item
- `DELETE /api/menu/:id` - Delete item

### Contact
- `POST /api/contact` - Submit contact form

### Health Check
- `GET /api/health` - Server status

## Database Schema

### MenuItem Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum: ['Tacos', 'Gorditas', 'Sopes', 'Drinks', 'Specials']),
  imageUrl: String,
  isAvailable: Boolean (default: true),
  featured: Boolean (default: false),
  timestamps: true
}
```

## Environment Variables

Create/modify `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/la_vera_cruzana
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

### Using MongoDB Atlas (Cloud Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/la_vera_cruzana
   ```

## Production Build

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Serve the built files:**
   The built files will be in `client/dist/`
   Configure your backend to serve these static files

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally: `sudo systemctl status mongod`
- Or verify your Atlas connection string is correct
- Check firewall settings if using Atlas

### Port Already in Use
- Change the PORT in `.env` file
- Kill the process using the port: `lsof -ti:5000 | xargs kill -9`

### Module Not Found Errors
- Delete `node_modules` folders and `package-lock.json`
- Run `npm install` again in both root and client directories

### Tailwind CSS Not Working
- Ensure PostCSS and Tailwind are properly configured
- Restart the development server

## Features Checklist

✅ Responsive mobile-first design
✅ Dynamic menu with category filtering
✅ Admin CRUD operations
✅ Smooth animations (Framer Motion)
✅ Contact form with validation
✅ Loading states and skeletons
✅ Featured items support
✅ Availability management
✅ Professional color scheme
✅ SEO-friendly structure

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React Router DOM for routing
- Axios for API calls

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- CORS enabled
- RESTful API architecture

## Support

For issues or questions:
- Check the `PROJECT_STRUCTURE.md` file
- Review API endpoints documentation
- Inspect browser console for errors
- Check server logs in terminal

---

**Made with ❤️ for La Vera Cruzana**

🌮 Enjoy building your Mexican food truck website!
