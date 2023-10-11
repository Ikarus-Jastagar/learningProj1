from fastapi import HTTPException,APIRouter

from models.UserImage import ImageUserAndMeta
from database.database import find_users_by_or,add_user

user_router = APIRouter(prefix='/api/users',tags=["Users"])

@user_router.post("/",status_code=201)
async def saveIncommingImage(data: ImageUserAndMeta):
    try:
        checkForUser = find_users_by_or(email=data.email,name=data.name,phoneNumber=data.phoneNumber)
    except Exception as error:
        raise HTTPException(status_code=500,detail=f"Internal server error: {error}")    
    if checkForUser:
        raise HTTPException(status_code=409,detail="User already exists")
    
    add_user(data)
    
    return "User data added"