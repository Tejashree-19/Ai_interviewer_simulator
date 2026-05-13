from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Question

router = APIRouter()

@router.post("/question")
def save_question(
    session_id: int,
    question_text: str,
    question_order: int
):

    db = SessionLocal()

    new_question = Question(
        session_id=session_id,
        question_text=question_text,
        question_order=question_order
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": "Question saved",
        "question_id": new_question.id
    }

