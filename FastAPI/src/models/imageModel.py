from pydantic import BaseModel
from bson import ObjectId

class ImageFilterObject(BaseModel):
    saturation:float
    brightness:float

class ImageObject(BaseModel):
    filter:ImageFilterObject
    owner:ObjectId
    name:str

    class Config:
        arbitrary_types_allowed = True