from .repository import HseRepository

class HseService:

    @staticmethod
    def list_events(project_id: str):
        return HseRepository.get_all(project_id)

    @staticmethod
    def get_event(event_id: str):
        return HseRepository.get_by_id(event_id)

    @staticmethod
    def create_event(data):
        payload = data.dict()
        payload["status"] = "open"
        return HseRepository.create(payload)

    @staticmethod
    def update_event(event_id: str, data):
        payload = data.dict(exclude_unset=True)
        return HseRepository.update(event_id, payload)
