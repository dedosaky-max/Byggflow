from pydantic import BaseModel
from typing import Optional, List

class HseEvent(BaseModel):
    id: str
    project_id: str
    tower_id: Optional[str]
    type: str
    description: Optional[str]
    status: str
    created_at: Optional[str]
    updated_at: Optional[str]
    photos: Optional[List[str]] = None
    attachments: Optional[List[str]] = None
    signatures: Optional[List[str]] = None
