from fastapi import APIRouter
from .service import HseService
from .schemas import HseEvent

router = APIRouter()

@router.get("/{project_id}", response_model=list[HseEvent])
def list_events(project_id: str):
    return HseService.list_events(project_id)

@router.get("/detail/{event_id}", response_model=HseEvent)
def get_event(event_id: str):
    return HseService.get_event(event_id)

@router.post("/", response_model=HseEvent)
def create_event(payload: HseEvent):
    return HseService.create_event(payload)

@router.put("/{event_id}", response_model=HseEvent)
def update_event(event_id: str, payload: HseEvent):
    return HseService.update_event(event_id, payload)
