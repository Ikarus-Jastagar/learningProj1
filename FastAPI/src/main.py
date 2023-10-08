from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config.database import UserImageMetaDB

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

class ImageUserAndMeta(BaseModel):
    email:str
    images: list[str]
    name:str
    phoneNumber:int

@app.get("/api/all_users_images/{number}")
async def getAllImages(number:int):

    allUsers = UserImageMetaDB.find({})
    allimages = [a for i in allUsers for a in i['images']]
    print("-------------------->",allimages)
    if(number>len(allimages)):
        number=len(allimages)
    return {
        "error":False,
        "message":"Images sent",
        "data":allimages[number:number+9]
    }

@app.post("/api/image_upload")
async def saveIncommingImage(data: ImageUserAndMeta):
    checkForUser = UserImageMetaDB.find_one({"email":data.email})

    if checkForUser:
        return{
            "error":True,
            "message":"This Email user has already used their trial"
        }
    newUserRef = UserImageMetaDB.insert_one(data.dict())
    print(newUserRef)
    return {
        "error": False,
        "further_process_allowance":True,
        "message":"Image Uploaded"
    }
