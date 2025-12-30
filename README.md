# Backend Project

AI generation failed to produce structured files. Context:
### File: backend/requirements.txt
```
fastapi==0.92.0
uvicorn==0.18.3
pydantic==1.10.2
python-dotenv==0.20.0
sqlalchemy==1.4.36
psycopg2==2.9.4
```

### File: backend/.env.example
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=youtube_clone
SECRET_KEY=your_secret_key_here
```

### File: backend/config.py
```python
from pydantic import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    SECRET_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
```

### File: backend/models/schemas.py
```python
from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    created_at: datetime

class Video(BaseModel):
    id: int
    title: str
    description: str
    user_id: int
    created_at: datetime

class Comment(BaseModel):
    id: int
    text: str
    video_id: int
    user_id: int
    created_at: datetime
```

### File: backend/services/business_service.py
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from typing import List
from datetime import datetime
from backend.models.schemas import User, Video, Comment
from backend.config import settings

engine = create_engine(f"postgresql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}")
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

class UserTable(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class VideoT