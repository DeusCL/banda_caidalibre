from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

from os import listdir, getcwd

from pathlib import Path

templates = Jinja2Templates(directory="app/templates")
default_router = APIRouter()

PROJECT_ROOT = Path(getcwd())

@default_router.get("/")
def default(request: Request):
    return templates.TemplateResponse("default/index.html", {"request": request})

@default_router.get("/get-event-photos")
def get_event_photos() -> dict:
    events_path = PROJECT_ROOT / 'app' / 'static' / 'img' / 'gallery' / 'events'

    return {
        event_name:[
            {'src':img_file, 'alter':f"{event_name} {str(index + 1).zfill(3)}"}
            for index, img_file in enumerate(listdir(events_path / event_name))
            if img_file.endswith(".webp")
        ]
        for event_name in listdir(events_path)
    }







