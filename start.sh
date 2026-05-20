#!/bin/bash

# Script para ejecutar el proyecto completo (Backend + Frontend)

echo "🚀 Iniciando Panoramic Studio..."
echo ""

# Kill any existing processes on ports 8000 y 5173
echo "Limpiando puertos anteriores..."
lsof -ti:8000 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5173 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5174 2>/dev/null | xargs kill -9 2>/dev/null

# Start backend
echo "📦 Iniciando backend FastAPI en puerto 8000..."
cd backend
python3 server.py > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
sleep 2

# Go back to root
cd ..

# Start frontend
echo "🎨 Iniciando frontend Vite..."
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 3

echo ""
echo "✅ ¡Sistema listo!"
echo ""
echo "📱 Frontend: http://localhost:5173 (o 5174 si está ocupado)"
echo "📡 Backend:  http://localhost:8000"
echo "🎭 Galería:  http://localhost:5173/galeria"
echo ""
echo "Logs:"
echo "  Backend:  tail -f /tmp/backend.log"
echo "  Frontend: tail -f /tmp/frontend.log"
echo ""
echo "Presiona Ctrl+C para detener"
echo ""

# Handle cleanup
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '❌ Servicios detenidos'; exit" INT TERM

wait
