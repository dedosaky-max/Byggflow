from pydantic import BaseModel
from typing import Optional, List

class ReportRequest(BaseModel):
    project_id: str
    start_date: Optional[str]
    end_date: Optional[str]

class ReportSection(BaseModel):
    title: str
    items: List[dict]

class ReportResponse(BaseModel):
    project_id: str
    generated_at: str
    sections: List[ReportSection]
