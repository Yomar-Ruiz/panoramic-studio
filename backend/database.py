from sqlmodel import SQLModel, create_engine, Session
from pathlib import Path
import os

BASE_DIR = Path(__file__).parent.absolute()
DB_PATH = BASE_DIR / "photos.db"

DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=False
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
