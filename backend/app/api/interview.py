from fastapi import APIRouter

router = APIRouter()

@router.post("/answer")
def process_answer(answer: str):
    return {
        "message": "Answer received",
        "your_answer": answer
    }