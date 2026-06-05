from datetime import datetime
from .repository import ReportRepository
from .schemas import ReportResponse, ReportSection

class ReportService:

    @staticmethod
    def generate_report(data):
        project_id = data.project_id
        start = data.start_date
        end = data.end_date

        deviazioni = ReportRepository.get_deviazioni(project_id, start, end)
        sja = ReportRepository.get_sja(project_id, start, end)
        fondazioni = ReportRepository.get_fondazioni(project_id)

        sections = [
            ReportSection(title="Deviazioni", items=deviazioni),
            ReportSection(title="SJA", items=sja),
            ReportSection(title="Fondazioni", items=fondazioni),
        ]

        return ReportResponse(
            project_id=project_id,
            generated_at=datetime.utcnow().isoformat(),
            sections=sections
        )
