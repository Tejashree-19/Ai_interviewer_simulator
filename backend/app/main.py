from fastapi import FastAPI
from app.api import interview  

app = FastAPI()

app.include_router(interview.router)   

@app.get("/")
def home():
    return {"message": "AI Interviewer Running 🚀"}