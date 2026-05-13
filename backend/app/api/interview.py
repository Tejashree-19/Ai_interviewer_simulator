from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_engine import generate_question

router = APIRouter()

class AnswerRequest(BaseModel):
    answer: str

@router.post("/answer")
def process_answer(data: AnswerRequest):
    next_q = generate_question(data.answer)

    return {
        "next_question": next_q
    }
