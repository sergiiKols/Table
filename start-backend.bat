@echo off
echo ====================================
echo Starting Backend Server
echo ====================================
echo.

cd Backend\DataManagementSystem.API

echo Checking .NET SDK...
dotnet --version
if %errorlevel% neq 0 (
    echo ERROR: .NET SDK not found!
    echo Please install .NET 6.0 SDK from https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

echo.
echo Restoring dependencies...
dotnet restore

echo.
echo Running Backend...
echo Backend will be available at: http://localhost:5000
echo Swagger UI at: http://localhost:5000/swagger
echo.
echo Press Ctrl+C to stop the server
echo.

dotnet run

pause
