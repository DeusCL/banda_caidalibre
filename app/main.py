import os

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.endpoints.default.index import default_router

app = FastAPI(docs_url=None, redoc_url=None)

templates = Jinja2Templates(directory="app/templates")

@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return templates.TemplateResponse(
        "errors/404.html",
        {"request": request},
        status_code=404
    )

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(os.path.join("app/static/img", "favicon.ico"))

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(default_router)

