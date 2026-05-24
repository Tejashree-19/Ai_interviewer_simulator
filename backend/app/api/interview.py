import random

from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.services.ai_engine import generate_question

router = APIRouter()

sessions = {}


@router.post("/session")
def create_session():

    session_id = len(sessions) + 1

    questions = [
        "Tell me about yourself.",
        "Explain your most challenging project.",
        "What are your strengths as a developer?",
        "Why do you want to become a software engineer?",
        "Describe a difficult bug you fixed.",
        "What technologies are you most comfortable with?",
        "Explain your role in your latest project.",
        "How do you handle tight deadlines?",
        "What is your favorite programming language and why?",
        "Describe a situation where you worked in a team."
    ]

    first_question = random.choice(questions)

    sessions[session_id] = {
        "questions": [first_question],
        "answers": [],
    }

    return {
        "session_id": session_id,
        "question": first_question
    }


@router.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):

    try:

        contents = await file.read()

        with open(f"uploaded_{file.filename}", "wb") as f:
            f.write(contents)

        return {
            "message": "uploaded successfully"
        }

    except Exception:

        return {
            "message": "upload failed"
        }
    

class AnswerRequest(BaseModel):
    answer: str
    session_id: int


@router.post("/answer")
def process_answer(data: AnswerRequest):

    if data.session_id not in sessions:

        return {
            "error": "Invalid session"
        }

    next_q = generate_question(data.answer)

    sessions[data.session_id]["answers"].append(
        data.answer
    )

    sessions[data.session_id]["questions"].append(
        next_q
    )

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