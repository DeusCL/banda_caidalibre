import os

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.endpoints.default.index import default_router
from app.gemini_chatbot import GeminiChatBot

from twilio.rest import Client
from dotenv import load_dotenv


app = FastAPI(docs_url=None, redoc_url=None)
templates = Jinja2Templates(directory="app/templates")


load_dotenv()


ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

IA_API_KEY = os.getenv('GEMINI_API_KEY')
IA_MODEL = os.getenv('GEMINI_MODEL')


client = Client(ACCOUNT_SID, AUTH_TOKEN)
chatbot = GeminiChatBot(IA_API_KEY)


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


@app.post("/webhook")
async def receive_message(request: Request) -> dict:
    form_data = await request.form()

    print("FORM DATA:", dict(form_data))

    body = form_data.get("Body", "")
    sender = form_data.get("From", "")

    if "/reset" in body:
        chatbot.reset_history(sender)
        response = "Chatbot reseteado."
    else:
        response = chatbot.send(body, sender, IA_MODEL)

    client.messages.create(
        body=response,
        from_=PHONE_NUMBER,
        to=sender
    )

    return {"message": "Mensaje recibido y respuesta enviada"}


@app.get("/test")
async def test() -> dict:
    return {"message": "Funcionando."}


app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(default_router)

