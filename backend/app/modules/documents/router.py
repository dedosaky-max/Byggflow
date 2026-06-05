from fastapi import APIRouter
from .service import DocumentsService
from .schemas import Document

router = APIRouter()

@router.get("/{project_id}", response_model=list[Document])
def list_documents(project_id: str):
    return DocumentsService.list_documents(project_id)

@router.get("/detail/{doc_id}", response_model=Document)
def get_document(doc_id: str):
    return DocumentsService.get_document(doc_id)

@router.post("/", response_model=Document)
def create_document(payload: Document):
    return DocumentsService.create_document(payload)

@router.put("/{doc_id}", response_model=Document)
def update_document(doc_id: str, payload: Document):
    return DocumentsService.update_document(doc_id, payload)
