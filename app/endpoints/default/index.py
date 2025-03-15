from typing import Any
from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")

def get_url_for(path) -> str:
    return f"https://bandacaidalibre.com/{path}"

templates.env.globals["get_url_for"] = get_url_for

default_router = APIRouter()

@default_router.get("/")
def default(request: Request):
    return templates.TemplateResponse("default/index.html", {"request": request})

