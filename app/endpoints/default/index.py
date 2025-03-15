from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")

default_router = APIRouter()

@default_router.get("/")
def default(request: Request):
    return templates.TemplateResponse("default/index.html", {"request": request})

