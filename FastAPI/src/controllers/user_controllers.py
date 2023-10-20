from fastapi import HTTPException
from services.services import add_new_unique_user

def add_new_user(user_data) -> bool:
    try:
        add_new_unique_user(user_data)
    except HTTPException as user_adding_error:
        raise user_adding_error
    return True