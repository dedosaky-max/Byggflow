from pydantic import BaseModel

class Deviazione(BaseModel):
    id: str
    description: str
    created_at: str
