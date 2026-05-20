# Backend - API Gallery

API REST con FastAPI + SQLModel para gestionar fotos de galer.

## Inicio Repido

```bash
python3 server.py
```

El servidor estar disponible en `http://localhost:8000`

## Estructura

- `server.py` - Aplicacinnn FastAPI con endpoints
- `models.py` - Modelos de datos (Photo)
- `database.py` - Configuracinnn de BD SQLite
- `requirements.txt` - Dependencias Python
- `photos.db` - Base de datos (creada automticamente)

## Dependencias

Instalar con:
```bash
pip3 install -r requirements.txt
```

## API Endpoints

### Obtener fotos
```
GET /api/photos?category=todos
```

### Subir foto
```
POST /api/photos
Content-Type: multipart/form-data

- title: string (requerido)
- description: string (opcional)
- category: string (requerido)
- tags: string (opcional, separadas por coma)
- license: string (default: "Comercial estndar")
- file: File (requerido, JPG/PNG/GIF/WebP, mx 5MB)
```

### Eliminar foto
```
DELETE /api/photos/{id}
```

### Obtener categors
```
GET /api/categories
```

## Base de Datos

SQLite automticamente crea la tabla `photo` con:
- id (Integer, PK)
- title (String)
- description (String)
- category (String)
- image_filename (String)
- tags (String, separadas por coma)
- license (String)
- created_at (DateTime)

## Almacenamiento de Imgenes

Ubicacinnn: `../public/uploads/`

Las imptrace genes se guardan con nombres UUID y se sirven en: `/uploads/{filename}`
