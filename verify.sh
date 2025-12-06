#!/bin/bash

echo "🔍 La Vera Cruzana - Project Verification"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js installation... "
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓${NC} $(node -v)"
else
    echo -e "${RED}✗ Not installed${NC}"
fi

# Check npm
echo -n "Checking npm installation... "
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} $(npm -v)"
else
    echo -e "${RED}✗ Not installed${NC}"
fi

# Check MongoDB
echo -n "Checking MongoDB installation... "
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not found (can use MongoDB Atlas)"
fi

echo ""
echo "📁 Project Structure Verification"
echo "---------------------------------"

# Check root files
echo -n "Root package.json... "
[ -f "package.json" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n ".env file... "
[ -f ".env" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "setup.sh... "
[ -f "setup.sh" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

# Check server files
echo -n "Server directory... "
[ -d "server" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "server.js... "
[ -f "server/server.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "MenuItem model... "
[ -f "server/models/MenuItem.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Menu routes... "
[ -f "server/routes/menuRoutes.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Seed script... "
[ -f "server/seed.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

# Check client files
echo -n "Client directory... "
[ -d "client" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Client package.json... "
[ -f "client/package.json" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Vite config... "
[ -f "client/vite.config.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Tailwind config... "
[ -f "client/tailwind.config.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "App.jsx... "
[ -f "client/src/App.jsx" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Navbar component... "
[ -f "client/src/components/Navbar.jsx" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Home page... "
[ -f "client/src/pages/Home.jsx" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Menu page... "
[ -f "client/src/pages/Menu.jsx" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Admin Dashboard... "
[ -f "client/src/pages/AdminDashboard.jsx" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "Zustand store... "
[ -f "client/src/store/menuStore.js" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo ""
echo "📚 Documentation Files"
echo "---------------------"
echo -n "README.md... "
[ -f "README.md" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "QUICK_START.md... "
[ -f "QUICK_START.md" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "PROJECT_STRUCTURE.md... "
[ -f "PROJECT_STRUCTURE.md" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo -n "PROJECT_SUMMARY.md... "
[ -f "PROJECT_SUMMARY.md" ] && echo -e "${GREEN}✓${NC}" || echo -e "${RED}✗${NC}"

echo ""
echo "🔍 Checking Dependencies"
echo "-----------------------"

# Check if node_modules exists
echo -n "Root node_modules... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not installed (run: npm install)"
fi

echo -n "Client node_modules... "
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not installed (run: cd client && npm install)"
fi

echo ""
echo "========================================="
echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "1. If dependencies are missing, run: ./setup.sh"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:5173 in your browser"
echo ""
