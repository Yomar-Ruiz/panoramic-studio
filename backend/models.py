from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

class Photo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    category: str
    image_filename: str
    tags: Optional[str] = None
    license: str = "Comercial estándar"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    def get_tags_list(self):
        if not self.tags:
            return []
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    def to_dict(self):
        image_url = self.image_filename if self.image_filename.startswith(('http://', 'https://')) else f'/uploads/{self.image_filename}'
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'image': image_url,
            'tags': self.get_tags_list(),
            'license': self.license,
            'created_at': self.created_at.isoformat()
        }
