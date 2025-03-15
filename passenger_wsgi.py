import os
import sys
import threading
import uvicorn

# Fix the path for imports
sys.path.insert(0, os.path.dirname(__file__))

from app.main import app

def run():
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Ensure Uvicorn runs in a separate thread
if "RUN_MAIN" not in os.environ:
    thread = threading.Thread(target=run, daemon=True)
    thread.start()