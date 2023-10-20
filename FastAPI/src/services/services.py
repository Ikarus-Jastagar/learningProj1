import database.database as db
from fastapi import HTTPException
from typing import List
import config.loadYaml as application
from models.UserImage import ImageUserAndMeta


def find_already_existing_user(**kwargs) -> str:
    try:
        user = db.find_users_by_or(**kwargs)
    except Exception as error:
        raise HTTPException(status_code=500,detail=f"Internal server error: {error}")
    return str(user)

def add_new_unique_user(user_data:ImageUserAndMeta)-> bool:
    # convert pydantic model to python Dict
    try:
        user_data_dict = user_data.dict()
    except Exception:
        raise HTTPException(status_code=400,detail="Wrong data format")
    # check if user already Exists
    try:
        find_already_existing_user(**user_data_dict)
    except Exception as already_exist:
        raise already_exist
    # Add the new user
    try:
        db.add_user(user_data_dict)
        return True
    except Exception as error:
        raise HTTPException(status_code=500,detail=f"Operation failed: {error}")

def get_all_images_of_all_users() -> List[str]:
    all_users = db.get_all_users()
    all_images = []
    for each_user_images_array in all_users:
        for each_image in each_user_images_array['images']:
            all_images.append(each_image)
    return all_images

def get_images_in_range(start:int, size:int) -> List[str]:
    try:
        all_images = get_all_images_of_all_users()
        if len(all_images)<=start+application.page_size:
            raise IndexError
        return all_images[start:start+size]
    except Exception as e:
        raise e

def get_last_n_images(start:int) -> List[str]:
    all_images = get_all_images_of_all_users()
    return all_images[-1*start:]

def get_first_n_images(start:int) -> List[str]:
    all_images = get_all_images_of_all_users()
    return all_images[start:]

def get_paged_images(page_number:int):
    try:
        return [get_images_in_range((page_number-1)*application.page_size,application.page_size),False]
    except IndexError as index_error:
        return [get_last_n_images(application.page_size),True]