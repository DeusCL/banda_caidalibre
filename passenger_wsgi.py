from app.main import app
from starlette.middleware.wsgi import WSGIApp

application = WSGIApp(app)