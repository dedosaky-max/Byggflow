from fastapi import APIRouter
from .service import LogisticsService
from .schemas import Delivery

router = APIRouter()

@router.get("/{project_id}", response_model=list[Delivery])
def list_deliveries(project_id: str):
    return LogisticsService.list_deliveries(project_id)

@router.get("/detail/{delivery_id}", response_model=Delivery)
def get_delivery(delivery_id: str):
    return LogisticsService.get_delivery(delivery_id)

@router.post("/", response_model=Delivery)
def create_delivery(payload: Delivery):
    return LogisticsService.create_delivery(payload)

@router.put("/{delivery_id}", response_model=Delivery)
def update_delivery(delivery_id: str, payload: Delivery):
    return LogisticsService.update_delivery(delivery_id, payload)
