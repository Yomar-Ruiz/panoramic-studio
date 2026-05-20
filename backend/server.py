from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from pathlib import Path
import shutil
import os
from datetime import datetime
import uuid

from models import Photo
from database import create_db_and_tables, get_session, engine

app = FastAPI(title="Gallery API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
BASE_DIR = Path(__file__).parent.parent
UPLOADS_DIR = BASE_DIR / "public" / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# Create database
create_db_and_tables()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/api/photos")
def get_photos(category: str = "todos", session: Session = Depends(get_session)):
    """Get all photos or filter by category"""
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
    """Upload a new photo"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Validate file extension
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = UPLOADS_DIR / unique_filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Create database record
    photo = Photo(
        title=title,
        description=description,
        category=category,
        image_filename=unique_filename,
        tags=tags,
        license=license
    )
    
    session.add(photo)
    session.commit()
    session.refresh(photo)
    
    return {"success": True, "photo": photo.to_dict()}

@app.delete("/api/photos/{photo_id}")
def delete_photo(photo_id: int, session: Session = Depends(get_session)):
    """Delete a photo and its file"""
    photo = session.get(Photo, photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    
    # Delete file
    file_path = UPLOADS_DIR / photo.image_filename
    if file_path.exists():
        try:
            file_path.unlink()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")
    
    # Delete database record
    session.delete(photo)
    session.commit()
    
    return {"success": True, "message": "Photo deleted"}

@app.get("/api/categories")
def get_categories(session: Session = Depends(get_session)):
    """Get all available categories"""
    photos = session.exec(select(Photo)).all()
    categories = set(['todos'])
    for photo in photos:
        categories.add(photo.category)
    return sorted(list(categories))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
