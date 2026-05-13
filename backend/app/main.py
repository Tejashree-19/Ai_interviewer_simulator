from fastapi import FastAPI

from app.api import interview
from app.api import session
from app.api import question
from app.api import answer
from app.api import evaluate

from fastapi.middleware.cors import CORSMiddleware
from app.api import interview
from app.api import session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interview.router)
app.include_router(session.router)
app.include_router(question.router)
app.include_router(answer.router)
app.include_router(evaluate.router)
