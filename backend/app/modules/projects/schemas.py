from pydantic import BaseModel
from typing import Optional

class Project(BaseModel):
    id: str
    name: str
    client: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    description: Optional[str]
    created_at: Optional[str]
    updated_at: Optional[str]
