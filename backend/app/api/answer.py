from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Answer

router = APIRouter()

@router.post("/answer/save")
def save_answer(
    question_id: int,
    answer_text: str
):

    db = SessionLocal()

    new_answer = Answer(
        question_id=question_id,
        answer_text=answer_text
    )

    db.add(new_answer)
    db.commit()
    db.refresh(new_answer)

    return {
        "message": "Answer saved",
        "answer_id": new_answer.id
    }
