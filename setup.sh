#!/bin/bash

# MERN Stack Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Setting up MERN Stack Development Environment"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo ""
echo "📦 Installing server dependencies..."
cd server
npm install

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd ../client
npm install

cd ..

# Check MongoDB connection
echo ""
echo "🗄️  Checking MongoDB connection..."
cd server
node -e "
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Attempting to connect to MongoDB...');
setTimeout(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ MongoDB connection successful!');
    await mongoose.connection.close();
  } catch (error) {
    console.log('⚠️  MongoDB connection failed. This is normal if MongoDB is not running locally.');
    console.log('💡 For full functionality, either:');
    console.log('   1. Install and start MongoDB locally, or');
    console.log('   2. Set up MongoDB Atlas and update the connection string in server/.env');
  }
  process.exit(0);
}, 1000);
"

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development servers:"
echo "  npm run dev"
echo ""
echo "Or start individually:"
echo "  Backend:  cd server && npm run dev"
echo "  Frontend: cd client && npm run dev"
echo ""
echo "Access the application at:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:5000"
echo ""
echo "📚 For deployment instructions, see DEPLOYMENT.md"