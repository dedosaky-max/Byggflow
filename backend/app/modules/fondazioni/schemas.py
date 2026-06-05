from pydantic import BaseModel
from typing import Optional, List

class Fondazione(BaseModel):
    id: str
    code: str
    name: str
    description: Optional[str]
    created_at: Optional[str]
    updated_at: Optional[str]
    notes: Optional[List[str]] = None
