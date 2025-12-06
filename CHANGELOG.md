# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-06

### Added

#### 🔐 Authentication & Authorization
- JWT-based authentication system with 30-day token expiry
- Role-Based Access Control (RBAC) - User and Admin roles
- Secure password hashing using bcryptjs (10 salt rounds)
- Protected API routes with middleware authorization
- Admin account creation via seed script (no public admin signup)
- Token-based session management with localStorage persistence
- Login and registration pages with form validation
- Private route component for frontend protection
- Auth context for global state management

#### 🍽️ Menu Management
- Full CRUD operations for menu items (Admin only)
- Category-based filtering (Tacos, Gorditas, Sopes, Drinks, Specials)
- Menu item availability toggle
- Featured items management
- Real-time menu updates with Zustand state management
- Image URL support for menu items
- Price and description fields
- Public API for viewing menu items

#### 📱 User Interface
- Responsive navigation bar with auth state integration
- Admin dashboard with data table
- Menu browsing page with category filters
- Contact form with submission handling
- Home page with business information
- Business hours display with real-time status
- Loading states and error handling
- Smooth animations using Framer Motion
- Mobile-first responsive design
- Floating call button for customer contact

#### 🎨 Design System
- Tailwind CSS integration
- Custom color palette (amber/orange theme)
- Reusable component library
- Consistent spacing and typography
- Lucide React icons throughout
- Professional gradient backgrounds
- Card-based layouts

#### 🛠️ Developer Experience
- Comprehensive documentation (15+ markdown files)
- Environment-based configuration
- MongoDB seeding scripts for menu and admin
- Concurrent development server setup
- Hot module replacement for faster development
- ESLint and code formatting setup
- Clear project structure and organization

#### 📚 Documentation
- Detailed README with quick start guide
- Authentication system documentation
- API endpoint reference
- Architecture diagrams and flow charts
- Security best practices guide
- Contributing guidelines
- MIT License
- Security policy and vulnerability reporting

#### ⚙️ Infrastructure
- Express.js backend server
- MongoDB database with Mongoose ODM
- React frontend with Vite build tool
- CORS configuration
- Error handling middleware
- Environment variable management
- Git repository initialization

### Technical Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- Axios
- React Router DOM
- Lucide React

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

### Security Features
- Password hashing before database storage
- JWT token verification middleware
- Role-based authorization checks
- Protected API endpoints
- Frontend route guards
- Environment variable protection
- CORS security headers

### Scripts Added
- `npm run dev` - Start development servers (backend + frontend)
- `npm run server` - Start backend server with nodemon
- `npm run client` - Start Vite dev server
- `npm run build` - Build frontend for production
- `npm run install-all` - Install all dependencies
- `npm run seed:admin` - Create admin user account

---

## [Unreleased]

### Planned Features
- [ ] Password reset functionality
- [ ] Email verification for new users
- [ ] Two-factor authentication (2FA)
- [ ] User profile editing
- [ ] Order management system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Image upload for menu items
- [ ] Advanced search and filters
- [ ] User reviews and ratings
- [ ] Admin analytics dashboard
- [ ] Delivery tracking integration
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Dark mode toggle

### Improvements Considered
- [ ] Implement refresh tokens
- [ ] Add rate limiting
- [ ] Enhance password policy
- [ ] Add input sanitization
- [ ] Implement caching strategy
- [ ] Add comprehensive test suite
- [ ] CI/CD pipeline setup
- [ ] Docker containerization
- [ ] Performance optimization
- [ ] Accessibility improvements (WCAG compliance)

---

## Version History

- **1.0.0** (2025-12-06) - Initial release with full authentication and menu management

---

For detailed changes, see the [commit history](https://github.com/CS-Fasih/StreetEats-MERN/commits/main).
