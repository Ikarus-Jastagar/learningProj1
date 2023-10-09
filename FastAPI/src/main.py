from fastapi import FastAPI, HTTPException
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

@app.get("/api/images/{number}")
async def getAllImages(number:int):

    allUsers = UserImageMetaDB.find({})
    allimages = [a for i in allUsers for a in i['images']]
    if(number>len(allimages)):
        number=len(allimages)
    return HTTPException(
        200,
        {"message":"Images sent"},
        {"data":allimages[number:number+9]
    })

@app.post("/api/user")
async def saveIncommingImage(data: ImageUserAndMeta):
    checkForUser = UserImageMetaDB.find_one({"email":data.email})

    if checkForUser:
        return{
            "error":True,
            "message":"This Email user has already used their trial"
        }
    UserImageMetaDB.insert_one(data.dict())
    return {
        "error": False,
        "further_process_allowance":True,
        "message":"Image Uploaded"
    }
