import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.endpoints.default.index import default_router

app = FastAPI()

# Get absolute path for static files
static_dir = os.path.join(os.path.dirname(__file__), "static")

app.mount("/static", StaticFiles(directory=static_dir), name="static")
app.include_router(default_router)

