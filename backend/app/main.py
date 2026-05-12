from backend.app.database import engine
from backend.app.models import Base
from fastapi import FastAPI
from backend.app.api import interview  

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(interview.router)   

@app.get("/")
def home():
    return {"message": "AI Interviewer Running 🚀"}