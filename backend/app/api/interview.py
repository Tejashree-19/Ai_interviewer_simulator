from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.services.ai_engine import generate_question

router = APIRouter()


@router.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):

    contents = await file.read()

    with open(file.filename, "wb") as f:
        f.write(contents)

    return {
        "message": "uploaded successfully"
    }


class AnswerRequest(BaseModel):
    answer: str
    session_id: int


@router.post("/answer")
def process_answer(data: AnswerRequest):

    next_q = generate_question(data.answer)

    return {
        "next_question": next_q,
        "interview_complete": False
    }

@router.get("/evaluate")
def evaluate_interview():

    return {
        "focus_score": 84,
        "confidence_score": 79,
        "communication_score": 88,
        "overall_feedback":
        "Strong communication and technical confidence."
    }
