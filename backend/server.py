import os
import shutil
import uuid
from pathlib import Path
from datetime import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import Session, select

from models import Photo
from database import create_db_and_tables, get_session, engine

USE_CLOUDINARY = False
if os.environ.get("CLOUDINARY_URL"):
    import cloudinary
    import cloudinary.uploader
    USE_CLOUDINARY = True

BASE_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = BASE_DIR / "public" / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(title="Gallery API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

@app.get("/api/photos")
def get_photos(category: str = "todos", session: Session = Depends(get_session)):
    if category == "todos":
        photos = session.exec(select(Photo)).all()
    else:
        photos = session.exec(select(Photo).where(Photo.category == category)).all()
    
    return [photo.to_dict() for photo in photos]

@app.post("/api/photos")
def upload_photo(
    title: str = Form(...),
    description: str = Form(None),
    category: str = Form(...),
    tags: str = Form(None),
    license: str = Form("Comercial estándar"),
    file: UploadFile = File(...),
    session: Session = Depends(get_session)
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    
    if USE_CLOUDINARY:
        try:
            upload_result = cloudinary.uploader.upload(
                file.file,
                public_id=f"gallery/{uuid.uuid4()}"
            )
            image_url_or_filename = upload_result.get("secure_url")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload to Cloudinary: {str(e)}")
    else:
        file_path = UPLOADS_DIR / unique_filename
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            image_url_or_filename = unique_filename
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    photo = Photo(
        title=title,
        description=description,
        category=category,
        image_filename=image_url_or_filename,
        tags=tags,
        license=license
    )
    
    session.add(photo)
    session.commit()
    session.refresh(photo)
    
    return {"success": True, "photo": photo.to_dict()}

@app.delete("/api/photos/{photo_id}")
def delete_photo(photo_id: int, session: Session = Depends(get_session)):
    photo = session.get(Photo, photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    
    if not USE_CLOUDINARY:
        file_path = UPLOADS_DIR / photo.image_filename
        if file_path.exists():
            try:
                file_path.unlink()
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")
    
    session.delete(photo)
    session.commit()
    
    return {"success": True, "message": "Photo deleted"}

@app.get("/api/categories")
def get_categories(session: Session = Depends(get_session)):
    photos = session.exec(select(Photo)).all()
    categories = set(['todos'])
    for photo in photos:
        categories.add(photo.category)
    return sorted(list(categories))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
