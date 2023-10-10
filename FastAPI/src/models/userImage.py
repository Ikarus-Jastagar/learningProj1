from pydantic import BaseModel
from bson import ObjectId

class ImageUserAndMeta(BaseModel):
    email:str
    images: list[str]
    name:str
    phoneNumber:int