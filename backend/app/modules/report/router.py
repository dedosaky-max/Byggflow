from fastapi import APIRouter
from .service import ReportService
from .schemas import ReportRequest, ReportResponse

router = APIRouter()

@router.post("/", response_model=ReportResponse)
def generate_report(payload: ReportRequest):
    return ReportService.generate_report(payload)
