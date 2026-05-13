from fastapi import APIRouter
from app.services.ai_engine import evaluate_answer

router = APIRouter()

@router.post("/evaluate")
def evaluate(answer: str):

    result = evaluate_answer(answer)

    return {
        "evaluation": result
    }
