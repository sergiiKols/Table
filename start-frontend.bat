@echo off
echo ====================================
echo Starting Frontend Application
echo ====================================
echo.

cd Frontend

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Checking npm...
npm --version

echo.
echo Installing dependencies (if needed)...
if not exist "node_modules" (
    echo Installing npm packages...
    npm install
) else (
    echo Dependencies already installed
)

echo.
echo Starting Frontend dev server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
