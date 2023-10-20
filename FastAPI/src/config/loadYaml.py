import os 

cwd = os.getcwd()  

import yaml
with open(os.path.join(cwd,"config",f"secrets.yml"),'r') as file:
    config = yaml.safe_load(file)

with open(os.path.join(cwd,"config",f"application.yml"),'r') as file:
    application = yaml.safe_load(file)

# secrets
mongo_url = config['mongodb']["mongo_url"]
jwt_secrets = config['jwt']["jwt_secret"]

# application
page_size = application['size']['page_size']
allowed_origins = application['origins']['allowed_origins']
