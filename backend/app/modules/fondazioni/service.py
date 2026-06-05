from .repository import FondazioniRepository

class FondazioniService:

    @staticmethod
    def list_fondazioni():
        return FondazioniRepository.get_all()

    @staticmethod
    def get_fondazione(fondazione_id: str):
        return FondazioniRepository.get_by_id(fondazione_id)

    @staticmethod
    def create_fondazione(data):
        payload = data.dict()
        return FondazioniRepository.create(payload)

    @staticmethod
    def update_fondazione(fondazione_id: str, data):
        payload = data.dict(exclude_unset=True)
        return FondazioniRepository.update(fondazione_id, payload)
