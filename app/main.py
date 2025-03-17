from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.endpoints.default.index import default_router

app = FastAPI(docs_url=None, redoc_url=None)

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(default_router)

