@echo off
echo ===================================================
echo Starting nrmn.ui local web server...
echo The showcase will be available at http://localhost:3000
echo ===================================================
start http://localhost:3000
npx.cmd -y serve
