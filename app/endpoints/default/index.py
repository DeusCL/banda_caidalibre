from typing import Any
from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")

def static_url_for(file) -> str:
    print(file)


    return file

templates.env.globals["static_url_for"] = static_url_for

default_router = APIRouter()

@default_router.get("/")
def default(request: Request):
    return templates.TemplateResponse("default/index.html", {"request": request})

