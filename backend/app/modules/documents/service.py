from .repository import DocumentsRepository

class DocumentsService:

    @staticmethod
    def list_documents(project_id: str):
        return DocumentsRepository.get_all(project_id)

    @staticmethod
    def get_document(doc_id: str):
        return DocumentsRepository.get_by_id(doc_id)

    @staticmethod
    def create_document(data):
        payload = data.dict()
        payload["version"] = 1
        payload["status"] = "draft"
        return DocumentsRepository.create(payload)

    @staticmethod
    def update_document(doc_id: str, data):
        payload = data.dict(exclude_unset=True)
        return DocumentsRepository.update(doc_id, payload)
