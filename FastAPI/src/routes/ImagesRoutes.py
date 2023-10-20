from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from controllers.image_controllers import get_paged_images_for_n_page
from typing import List

image_router = APIRouter(prefix='/api/v1/images',tags=["Images"])

class PagedImagesResponseModel(BaseModel):
    images: List[str]
    maxReached: bool

@image_router.get("/{page}",status_code=200,response_model=PagedImagesResponseModel)
async def get_all_images(page:int):
    try:
        data_from_services = get_paged_images_for_n_page(page)
        response = PagedImagesResponseModel(
            images=data_from_services[0],
            maxReached=data_from_services[1]
            )
        return response
    except Exception as error:
        return HTTPException(500,{"error":error})