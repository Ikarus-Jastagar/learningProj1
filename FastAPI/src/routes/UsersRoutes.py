from fastapi import HTTPException,APIRouter

from models.UserImage import ImageUserAndMeta
from controllers.user_controllers import add_new_user

user_router = APIRouter(prefix='/api/v1/users',tags=["Users"])

@user_router.post("/",status_code=201)
async def save_incomming_image(data: ImageUserAndMeta):
    try:
        add_new_user(data)
    except HTTPException as adding_exception: 
        raise adding_exception
    
    return "User data added"