from .repository import DeviazioniRepository

class DeviazioniService:

    @staticmethod
    def list_deviazioni():
        return DeviazioniRepository.get_all()
