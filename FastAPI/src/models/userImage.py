from pydantic import BaseModel
from bson import ObjectId

class ImageUserAndMeta(BaseModel):
    email:str
    images: list[ObjectId]
    name:str
    password:str
    phoneNumber:int