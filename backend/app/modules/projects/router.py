from fastapi import APIRouter
from .service import ProjectsService
from .schemas import Project

router = APIRouter()

@router.get("/", response_model=list[Project])
def list_projects():
    return ProjectsService.list_projects()

@router.get("/{project_id}", response_model=Project)
def get_project(project_id: str):
    return ProjectsService.get_project(project_id)

@router.post("/", response_model=Project)
def create_project(payload: Project):
    return ProjectsService.create_project(payload)

@router.put("/{project_id}", response_model=Project)
def update_project(project_id: str, payload: Project):
    return ProjectsService.update_project(project_id, payload)
