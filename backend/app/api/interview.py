from fastapi import APIRouter
from backend.app.services.ai_engine import generate_question

router = APIRouter()

@router.post("/answer")
def process_answer(answer: str):
    next_q = generate_question(answer)

    return {
        "next_question": next_q
    }