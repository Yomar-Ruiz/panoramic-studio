# Sistema de Galería Dinámico

Este proyecto combina un frontend React con un backend FastAPI para una galería de fotos totalmente funcional.

## 🚀 Instalación Rápida

### Opción 1: Script automático (recomendado)

```bash
./start.sh
```

### Opción 2: Ejecutar manualmente en dos terminales

**Terminal 1 - Backend:**
```bash
cd backend
python3 server.py
```

El backend estará en: `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

El frontend estará en: `http://localhost:5173` (o `5174` si está ocupado)

### Acceder a la Galería
- **URL**: http://localhost:5173/galeria
- **Backend API**: http://localhost:8000/api

## ✨ Características

✅ **Galería Dinámica**
- Carga de fotos en tiempo real desde la API
- Filtrado por categorías (automáticamente detectadas)
- Estado de carga y manejo de errores

✅ **Upload de Fotos**
- Modal intuitivo con validación
- Soporte para: JPG, PNG, GIF, WebP
- Límite: 5MB por foto
- Campos: Título, Descripción, Categoría, Etiquetas, Licencia

✅ **Eliminación de Fotos**
- Botón "Eliminar" visible al hacer hover sobre tarjetas
- Confirmación antes de eliminar
- Elimina automáticamente archivo e registro en BD

✅ **Base de Datos**
- SQLite local en `backend/photos.db` (creada automáticamente)
- Metadata completa por foto
- Timestamps automáticos

✅ **Almacenamiento de Imágenes**
- Ubicación: `/public/uploads/`
- Nombres únicos con UUID
- Accesibles directamente desde el navegador

## 📁 Estructura del Proyecto

```
panoramic-studio/
├── backend/
│   ├── server.py              # App FastAPI principal
│   ├── models.py              # Modelo SQLModel para Photo
│   ├── database.py            # Configuración SQLAlchemy + SQLite
│   ├── requirements.txt        # Dependencias Python
│   └── photos.db              # Base de datos SQLite (creada automáticamente)
├── src/
│   ├── api/
│   │   └── photoService.js       # Cliente HTTP para API
│   ├── components/
│   │   ├── PhotoUploadModal.jsx  # Modal de upload
│   │   └── PhotoCard.jsx         # Tarjeta de foto (actualizado)
│   ├── pages/
│   │   └── GalleryPage.jsx       # Página de galería (actualizado)
│   └── ...
├── public/
│   └── uploads/               # Imágenes subidas (creada automáticamente)
├── start.sh                   # Script para ejecutar ambos servidores
└── ...
```

## 🔌 Endpoints de API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/photos?category=todos` | Obtener fotos (filtradas por categoría) |
| POST | `/api/photos` | Subir una nueva foto |
| DELETE | `/api/photos/{id}` | Eliminar una foto por ID |
| GET | `/api/categories` | Obtener categorías disponibles |

### Ejemplo de Upload (cURL)
```bash
curl -X POST "http://localhost:8000/api/photos" \
  -F "title=Mi Foto" \
  -F "description=Descripción" \
  -F "category=producto" \
  -F "tags=tag1,tag2" \
  -F "license=Comercial estándar" \
  -F "file=@foto.png"
```

## 🛠️ Tecnologías

**Backend:**
- FastAPI 0.104.1
- SQLModel 0.0.14 (ORM SQLAlchemy + Pydantic)
- Uvicorn 0.24.0 (ASGI server)
- SQLite (base de datos)

**Frontend:**
- React 19.2.6
- React Router 7.15.1
- Tailwind CSS 3.4.0
- Vite 8.0.12

## 📋 Requisitos

- Python 3.8+
- Node.js 16+
- npm o yarn

## 🐛 Solución de Problemas

### Error "Failed to fetch" en el frontend

**Solución**: Asegúrate de que:
1. El backend está corriendo: `cd backend && python3 server.py`
2. El backend está en puerto 8000
3. El frontend está en puerto 5173 o 5174

### Puerto 8000 en uso

```bash
lsof -ti:8000 | xargs kill -9
```

### Limpiar BD para empezar de nuevo

```bash
rm backend/photos.db
```

## 📝 Notas

- Las imágenes se almacenan en `/public/uploads/` con nombres UUID únicos
- La BD SQLite se crea automáticamente en `backend/photos.db` al iniciar
- CORS está habilitado para permitir solicitudes desde el frontend
- El servidor de producción necesita servir los archivos en `/public/uploads/` como estáticos
