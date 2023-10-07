# from confz import ConfZ, ConfZFileSource
import os 

cwd = os.getcwd()   
# class MyAppConfig(ConfZ):
#     # Load secrets.yaml file only for non-production environments
#     CONFIG_SOURCES = [
#         ConfZFileSource(ConfZFileSource(os.path.join(cwd,"config",f"secrets.yml")))
#     ]
#     mongodb: dict ={}
#     jwt: dict ={}




import yaml
with open(os.path.join(cwd,"config",f"secrets.yml"),'r') as file:
    config = yaml.safe_load(file)

print(config)

mongo_url = config['mongodb']["mongo_url"]
jwt_secrets = config['jwt']["jwt_secret"]