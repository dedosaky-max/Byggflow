from pydantic import BaseModel
from typing import Optional

class Sja(BaseModel):
    id: str
    project_id: str
    fondazione_code: Optional[str]
    titolo: str
    descrizione: Optional[str]
    rischio: str
    stato: str
    created_at: Optional[str]
