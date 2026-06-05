from .repository import ProjectsRepository

class ProjectsService:

    @staticmethod
    def list_projects():
        return ProjectsRepository.get_all()

    @staticmethod
    def get_project(project_id: str):
        return ProjectsRepository.get_by_id(project_id)

    @staticmethod
    def create_project(data):
        payload = data.dict()
        return ProjectsRepository.create(payload)

    @staticmethod
    def update_project(project_id: str, data):
        payload = data.dict(exclude_unset=True)
        return ProjectsRepository.update(project_id, payload)
