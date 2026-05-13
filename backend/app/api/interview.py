from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_engine import (
    generate_question,
    evaluate_answer
)

from app.database import SessionLocal
from app.models import Session

router = APIRouter()


class AnswerRequest(BaseModel):
    answer: str
    session_id: int


@router.post("/answer")
def process_answer(data: AnswerRequest):

    db = SessionLocal()

    session = db.query(Session).filter(
        Session.id == data.session_id
    ).first()

    if not session:
        return {
            "error": "Session not found"
        }

    session.question_count += 1

    db.commit()

    if session.question_count >= 5:

        evaluation = evaluate_answer(data.answer)

        return {
            "interview_complete": True,
            "evaluation": evaluation
        }

    else:

        next_q = generate_question(data.answer)

        return {
            "interview_complete": False,
            "next_question": next_q
        }
