from fastapi import APIRouter
from .service import DeviazioniService
from .schemas import Deviazione

router = APIRouter()

@router.get("/", response_model=list[Deviazione])
def list_deviazioni():
    return DeviazioniService.list_deviazioni()
