from .repository import SjaRepository

class SjaService:

    @staticmethod
    def list_sja(project_id: str):
        return SjaRepository.get_all(project_id)

    @staticmethod
    def get_sja(sja_id: str):
        return SjaRepository.get_by_id(sja_id)

    @staticmethod
    def create_sja(data):
        payload = data.dict()
        payload["stato"] = "aperta"
        if "rischio" not in payload:
            payload["rischio"] = "medio"
        return SjaRepository.create(payload)

    @staticmethod
    def update_sja(sja_id: str, data):
        payload = data.dict(exclude_unset=True)
        return SjaRepository.update(sja_id, payload)
