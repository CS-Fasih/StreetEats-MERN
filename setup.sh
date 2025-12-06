#!/bin/bash

echo "🌮 La Vera Cruzana - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Please make sure MongoDB is installed and running."
    echo "   You can also use MongoDB Atlas (cloud) by updating the MONGODB_URI in .env"
fi

echo ""
echo "📦 Installing root dependencies..."
npm install

echo ""
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo ""
echo "🌱 Seeding database with sample menu items..."
node server/seed.js

echo ""
echo "=================================="
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📝 The server will run on: http://localhost:5000"
echo "🌐 The client will run on: http://localhost:5173"
echo ""
echo "👨‍💼 Access the admin dashboard at: http://localhost:5173/admin/dashboard"
echo ""
echo "🌮 Happy coding!"
