from .repository import LogisticsRepository

class LogisticsService:

    @staticmethod
    def list_deliveries(project_id: str):
        return LogisticsRepository.get_deliveries(project_id)

    @staticmethod
    def get_delivery(delivery_id: str):
        return LogisticsRepository.get_delivery(delivery_id)

    @staticmethod
    def create_delivery(data):
        payload = data.dict()
        payload["status"] = "pending"
        return LogisticsRepository.create_delivery(payload)

    @staticmethod
    def update_delivery(delivery_id: str, data):
        payload = data.dict(exclude_unset=True)
        return LogisticsRepository.update_delivery(delivery_id, payload)
