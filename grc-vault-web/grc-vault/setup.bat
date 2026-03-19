@echo off
echo.
echo  ========================================
echo   GRC Vault - Web Server Setup
echo   Governance, Risk ^& Compliance Platform
echo  ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js 18+ is required.
    echo     Download from https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js detected

echo.
echo Installing dependencies...
call npm install --production
echo [OK] Dependencies installed

echo.
echo Starting GRC Vault...
echo Access at: http://localhost:3000
echo Press Ctrl+C to stop.
echo.
call npm start
pause
