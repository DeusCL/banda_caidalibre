from typing import Any
from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")

def https_url_for(request: Request, name: str, **path_params: Any) -> str:
    http_url = request.url_for(name, **path_params)

    # Replace 'http' with 'https'
    result = http_url.replace("http", "https", 1)
    return result

templates.env.globals["https_url_for"] = https_url_for

default_router = APIRouter()

@default_router.get("/")
def default(request: Request):
    return templates.TemplateResponse("default/index.html", {"request": request})

