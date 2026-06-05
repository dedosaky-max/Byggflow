from .repository import UsersRepository

class UsersService:

    @staticmethod
    def list_users():
        return UsersRepository.get_all()

    @staticmethod
    def get_user(user_id: str):
        return UsersRepository.get_by_id(user_id)

    @staticmethod
    def create_user(data):
        payload = data.dict()
        if "role" not in payload:
            payload["role"] = "worker"
        return UsersRepository.create(payload)

    @staticmethod
    def update_user(user_id: str, data):
        payload = data.dict(exclude_unset=True)
        return UsersRepository.update(user_id, payload)
