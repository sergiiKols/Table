@echo off
echo ====================================
echo Database Setup Script
echo ====================================
echo.

cd Backend\DataManagementSystem.API

echo Checking .NET SDK...
dotnet --version
if %errorlevel% neq 0 (
    echo ERROR: .NET SDK not found!
    pause
    exit /b 1
)

echo.
echo Step 1: Restoring dependencies...
dotnet restore

echo.
echo Step 2: Creating migration...
dotnet ef migrations add InitialCreate

echo.
echo Step 3: Updating database...
dotnet ef database update

echo.
echo ====================================
echo Database setup completed!
echo ====================================
echo.
echo You can now run the Backend server using start-backend.bat
echo.

pause
