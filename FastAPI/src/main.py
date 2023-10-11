from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.UsersRoutes import user_router
from routes.ImagesRoutes import image_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(image_router)
app.include_router(user_router)