from pymongo import MongoClient
from config.loadYaml import mongo_url
from models.UserImage import ImageUserAndMeta

myclient = MongoClient(mongo_url)
database = myclient['test']
UserImageMetaDB = database["UserImageMeta"]

def get_all_users():
    all_users = UserImageMetaDB.find({})
    return all_users

def find_users_by_or(**kwargs):
    final_search_query = [{key: value} for key, value in kwargs.items()]
    result = UserImageMetaDB.find_one({"$or":final_search_query})
    return result

def add_user(user_data:ImageUserAndMeta):
    try:
        user_to_add = user_data.dict()
        inserted_user_ref = UserImageMetaDB.insert_one(user_to_add)
        return inserted_user_ref
    except Exception as error:
        raise error