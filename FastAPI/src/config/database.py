from pymongo import MongoClient
# from config.loadYaml import mongo_url

mongo_url = "mongodb://localhost:27017"
print("DATABASE-->",mongo_url)

myclient = MongoClient(mongo_url)
database = myclient['test']
UserDB = database["Users"]
TaskDB = database["Tasks"]
UserImageMetaDB = database["UserImageMeta"]