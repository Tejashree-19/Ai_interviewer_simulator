from fastapi import FastAPI
from app.api import interview
from app.api import session

app = FastAPI()

app.include_router(interview.router)
app.include_router(session.router)
