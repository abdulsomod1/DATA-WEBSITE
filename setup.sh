#!/bin/bash

# DEV-VAULT DATA - Setup Script
# This script automates the setup process

echo "🚀 DEV-VAULT DATA - Setup Script"
echo "=================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Copy environment file
echo ""
echo "🔧 Setting up environment variables..."

if [ ! -f ".env.local" ]; then
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        echo "✅ Created .env.local from template"
        echo ""
        echo "⚠️  IMPORTANT: Please update .env.local with your Supabase credentials:"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
    else
        echo "❌ .env.local.example not found"
        exit 1
    fi
else
    echo "✅ .env.local already exists"
fi

# Done
echo ""
echo "✨ Setup completed successfully!"
echo ""
echo "📚 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For more information, see QUICK_START.md"
