from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from config.loadYaml import page_size
from controllers.image_controllers import images_pageination
from typing import List

image_router = APIRouter(prefix='/api/images',tags=["Images"])

class PagedImagesResponseModel(BaseModel):
    images: List[str]
    maxReached: bool

@image_router.get("/{page}",status_code=200,response_model=PagedImagesResponseModel)
async def get_all_images(page:int):
    try:
        images_to_send = images_pageination(page_size*(page-1),page_size)
        response = PagedImagesResponseModel(images=images_to_send[0],maxReached=images_to_send[1])

        return response
    except Exception as error:
        return HTTPException(500,{"error":error})