@echo off
REM DEV-VAULT DATA - Setup Script (Windows)
REM This script automates the setup process

echo.
echo ==================================
echo DEV-VAULT DATA - Setup Script
echo ==================================
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed

REM Copy environment file
echo.
echo 🔧 Setting up environment variables...

if not exist ".env.local" (
    if exist ".env.local.example" (
        copy .env.local.example .env.local
        echo ✅ Created .env.local from template
        echo.
        echo ⚠️  IMPORTANT: Please update .env.local with your Supabase credentials:
        echo    - NEXT_PUBLIC_SUPABASE_URL
        echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
        echo    - SUPABASE_SERVICE_ROLE_KEY
    ) else (
        echo ❌ .env.local.example not found
        pause
        exit /b 1
    )
) else (
    echo ✅ .env.local already exists
)

REM Done
echo.
echo ✨ Setup completed successfully!
echo.
echo 📚 Next steps:
echo 1. Update .env.local with your Supabase credentials
echo 2. Run 'npm run dev' to start development server
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📖 For more information, see QUICK_START.md
echo.
pause
