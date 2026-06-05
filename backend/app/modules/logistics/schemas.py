from pydantic import BaseModel
from typing import Optional, List

class Delivery(BaseModel):
    id: str
    project_id: str
    delivery_base_id: str
    purchaser_id: Optional[str]
    supplier: Optional[str]
    po_number: Optional[str]
    materials: Optional[str]
    status: str
    created_at: Optional[str]
    attachments: Optional[List[str]] = None
