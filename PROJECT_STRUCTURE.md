# La Vera Cruzana - Project Structure

```
LA_VERA_CRUZANA/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.jsx          # Navigation bar with animations
│   │   │   ├── Footer.jsx          # Footer with contact info
│   │   │   ├── MenuItemCard.jsx    # Menu item display card
│   │   │   └── LoadingSkeleton.jsx # Loading placeholders
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx            # Landing page with hero
│   │   │   ├── Menu.jsx            # Menu page with filters
│   │   │   ├── Contact.jsx         # Contact form page
│   │   │   └── AdminDashboard.jsx  # Admin CRUD interface
│   │   ├── store/                   # State management
│   │   │   └── menuStore.js        # Zustand store for menu
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Express Backend
│   ├── controllers/                 # Route controllers
│   │   ├── menuController.js       # Menu CRUD operations
│   │   └── contactController.js    # Contact form handler
│   ├── models/                      # Mongoose models
│   │   └── MenuItem.js             # Menu item schema
│   ├── routes/                      # API routes
│   │   ├── menuRoutes.js           # Menu endpoints
│   │   └── contactRoutes.js        # Contact endpoints
│   ├── server.js                    # Express server setup
│   ├── seed.js                      # Database seeding script
│   └── seedData.js                  # Sample menu data
│
├── .env                             # Environment variables
├── .gitignore
├── package.json                     # Root package.json
├── setup.sh                         # Setup script
└── README.md

## API Endpoints

### Menu Items
- GET    /api/menu              - Get all menu items
- GET    /api/menu/:id          - Get single menu item
- POST   /api/menu              - Create new menu item (Admin)
- PUT    /api/menu/:id          - Update menu item (Admin)
- DELETE /api/menu/:id          - Delete menu item (Admin)

### Contact
- POST   /api/contact           - Submit contact form

### Health Check
- GET    /api/health            - Server health status

## Color Palette

- Primary (Burnt Orange): #E65100
- Secondary (Deep Green): #2E7D32
- Accent (Warm Yellow): #FBC02D
- Background (Cream): #FFF8E1

## Typography

- Headings: 'Poppins' (Bold, appetizing)
- Body: 'Inter' (Clean, readable)

## Key Features

✅ Fully responsive (mobile-first)
✅ Dynamic menu with real-time updates
✅ Admin dashboard for CRUD operations
✅ Smooth animations with Framer Motion
✅ Contact form with validation
✅ Loading skeletons for better UX
✅ Category filtering
✅ Featured items support
✅ Availability status management
✅ Professional design system
