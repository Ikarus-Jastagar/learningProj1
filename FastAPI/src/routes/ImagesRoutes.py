from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from controllers.image_controllers import images_pageination
from typing import List

image_router = APIRouter()

class PagedImagesResponseModel(BaseModel):
    images: List[str]

@image_router.get("/{page}",status_code=200,response_model=PagedImagesResponseModel)
async def get_all_images(page:int):
    try:
        images_to_send = images_pageination(6*(page-1),6)
        print(images_to_send)
        response = PagedImagesResponseModel(images=images_to_send)

        return response
    except Exception as error:
        return HTTPException(500,{"error":error})