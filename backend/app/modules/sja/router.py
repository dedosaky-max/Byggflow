from fastapi import APIRouter
from .service import SjaService
from .schemas import Sja

router = APIRouter()

@router.get("/{project_id}", response_model=list[Sja])
def list_sja(project_id: str):
    return SjaService.list_sja(project_id)

@router.get("/detail/{sja_id}", response_model=Sja)
def get_sja(sja_id: str):
    return SjaService.get_sja(sja_id)

@router.post("/", response_model=Sja)
def create_sja(payload: Sja):
    return SjaService.create_sja(payload)

@router.put("/{sja_id}", response_model=Sja)
def update_sja(sja_id: str, payload: Sja):
    return SjaService.update_sja(sja_id, payload)
