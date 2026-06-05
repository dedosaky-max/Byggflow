from fastapi import APIRouter
from .service import UsersService
from .schemas import User

router = APIRouter()

@router.get("/", response_model=list[User])
def list_users():
    return UsersService.list_users()

@router.get("/{user_id}", response_model=User)
def get_user(user_id: str):
    return UsersService.get_user(user_id)

@router.post("/", response_model=User)
def create_user(payload: User):
    return UsersService.create_user(payload)

@router.put("/{user_id}", response_model=User)
def update_user(user_id: str, payload: User):
    return UsersService.update_user(user_id, payload)
