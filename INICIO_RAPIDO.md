# 🚀 Inicio Rápido - Galería Dinámica

## ¿Qué se ha creado?

Un sistema completo de galería dinámico con:
- ✅ **Backend FastAPI** - API REST para CRUD de fotos
- ✅ **Frontend React** - Interfaz moderna con Tailwind CSS
- ✅ **Base de Datos SQLite** - Almacenamiento de metadata
- ✅ **Upload de Imágenes** - Con validación y límite de tamaño
- ✅ **Eliminación** - Botón para borrar fotos
- ✅ **Categorías Dinámicas** - Se crean automáticamente

## 1️⃣ Iniciar el Sistema

### Opción A: Automático (Recomendado)
```bash
./start.sh
```

### Opción B: Manual - Dos terminales

**Terminal 1:**
```bash
cd backend
python3 server.py
```

**Terminal 2:**
```bash
npm run dev
```

## 2️⃣ Acceder a la Galería

Abre tu navegador en:
```
http://localhost:5173/galeria
```

## 3️⃣ Funcionalidades

### 📤 Subir una foto
1. Haz clic en el botón **"+ Subir Foto"**
2. Completa el formulario:
   - Título (requerido)
   - Descripción
   - Categoría (requerido)
   - Etiquetas (opcional, separadas por coma)
   - Selecciona un archivo de imagen
3. Haz clic en "Subir Foto"

### 🔍 Filtrar por categoría
- Haz clic en los botones de categoría en la parte superior
- Se mostrarán solo las fotos de esa categoría

### 🗑️ Eliminar una foto
1. Haz hover (pon el mouse) sobre una tarjeta de foto
2. Aparecerá el botón "Eliminar"
3. Haz clic y confirma

## 📁 Archivos Creados

```
/backend
  ├── server.py           ← App FastAPI
  ├── models.py           ← Modelo Photo
  ├── database.py         ← Config BD
  ├── requirements.txt    ← Dependencias Python
  └── README.md          

/src
  ├── api/photoService.js      ← Cliente HTTP
  └── components/
      ├── PhotoUploadModal.jsx  ← Modal de upload
      └── PhotoCard.jsx         ← Tarjeta actualizada
  └── pages/
      └── GalleryPage.jsx       ← Página actualizada

/public/uploads/               ← Carpeta de imágenes (creada automáticamente)

./start.sh                     ← Script para iniciar ambos servidores
GALLERY_SETUP.md               ← Documentación técnica completa
```

## 🔌 URLs Importantes

| URL | Descripción |
|-----|-------------|
| http://localhost:5173/galeria | 🎭 Frontend - Galería |
| http://localhost:8000 | 📡 Backend - API |
| http://localhost:8000/docs | 📚 Documentación interactiva de API |
| http://localhost:5173 | 🏠 Página de inicio |

## 📊 API Reference

### Subir foto (cURL)
```bash
curl -X POST "http://localhost:8000/api/photos" \
  -F "title=Mi Foto" \
  -F "category=paisaje" \
  -F "tags=naturaleza" \
  -F "file=@imagen.png"
```

### Obtener fotos
```bash
curl http://localhost:8000/api/photos?category=todos
```

### Eliminar foto
```bash
curl -X DELETE "http://localhost:8000/api/photos/1"
```

## 🎨 Personalización

### Cambiar colores
Edita `tailwind.config.js` para cambiar `brand-500` (color principal)

### Agregar más campos a foto
1. Actualiza `backend/models.py` (agregar campo)
2. Actualiza `src/components/PhotoUploadModal.jsx` (agregar input)
3. Actualiza `src/api/photoService.js` (agregar a FormData)

### Cambiar límite de tamaño de archivo
Edita `src/components/PhotoUploadModal.jsx` línea 15:
```javascript
if (selectedFile.size > 5 * 1024 * 1024) {  // 5MB - Cambiar aquí
```

## ⚠️ Solución de Problemas

### "Failed to fetch" en el frontend
- ✅ Verifica que el backend esté corriendo en puerto 8000
- ✅ Abre http://localhost:8000/api/photos para confirmar

### Puerto 8000 en uso
```bash
lsof -ti:8000 | xargs kill -9
```

### Limpiar y empezar de nuevo
```bash
rm backend/photos.db
rm -rf public/uploads/*
```

### Ver logs del servidor
```bash
tail -f /tmp/backend.log    # Si usas start.sh
tail -f /tmp/frontend.log   # Si usas start.sh
```

## 📚 Documentación Completa

Para más detalles técnicos, lee: `GALLERY_SETUP.md`

## ✨ ¡Listo!

Tu galería dinámica está completamente funcional. 🎉

¿Preguntas o problemas? Revisa GALLERY_SETUP.md para más información.
