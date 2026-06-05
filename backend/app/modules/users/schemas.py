from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: str
    email: str
    full_name: Optional[str]
    role: Optional[str]
    created_at: Optional[str]
