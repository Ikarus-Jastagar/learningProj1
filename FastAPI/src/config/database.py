from pymongo import MongoClient
from config.loadYaml import mongo_url

myclient = MongoClient(mongo_url)
database = myclient['test']
UserImageMetaDB = database["UserImageMeta"]