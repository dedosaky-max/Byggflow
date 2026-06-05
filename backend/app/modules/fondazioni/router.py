from fastapi import APIRouter
from .service import FondazioniService
from .schemas import Fondazione

router = APIRouter()

@router.get("/", response_model=list[Fondazione])
def list_fondazioni():
    return FondazioniService.list_fondazioni()

@router.get("/{fondazione_id}", response_model=Fondazione)
def get_fondazione(fondazione_id: str):
    return FondazioniService.get_fondazione(fondazione_id)

@router.post("/", response_model=Fondazione)
def create_fondazione(payload: Fondazione):
    return FondazioniService.create_fondazione(payload)

@router.put("/{fondazione_id}", response_model=Fondazione)
def update_fondazione(fondazione_id: str, payload: Fondazione):
    return FondazioniService.update_fondazione(fondazione_id, payload)
