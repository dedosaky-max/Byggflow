from pydantic import BaseModel
from typing import Optional, List

class Document(BaseModel):
    id: str
    project_id: str
    name: str
    category: Optional[str]
    status: Optional[str]
    version: Optional[int]
    created_at: Optional[str]
    updated_at: Optional[str]
    attachments: Optional[List[str]]
