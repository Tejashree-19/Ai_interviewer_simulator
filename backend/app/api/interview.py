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
        print("VIDEO RECEIVED:", file.filename)

        contents = await file.read()

        with open(f"uploaded_{file.filename}", "wb") as f:
            f.write(contents)

        return {"message": "uploaded successfully"}

    except Exception as e:
        print(e)
        return {"message": "upload failed"}
    

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


@router.get("/evaluate/{session_id}")
def evaluate_interview(session_id: int):

    if session_id not in sessions:
        return {"error": "Invalid session"}

    answers = sessions[session_id]["answers"]

    total_words = sum(
        len(answer.split())
        for answer in answers
    )

    communication = min(100, total_words)
   
    focus = max(40, 100 - (answers.count("idk") * 15))

    confidence = max(
          40,
          100 - sum(
                 10 for a in answers
                 if len(a.split()) < 3
                )
    )

    if communication < 30:
    	feedback = "Your answers were very short. Try explaining concepts with more detail and examples."
    elif focus < 60:
    	feedback = "Stay focused on the question and avoid vague responses."
    elif confidence < 60:
    	feedback = "Answer with more confidence and provide stronger technical explanations."
    else:
    	feedback = "Strong communication and technical confidence."

    return {
        "focus_score": focus,
        "confidence_score": confidence,
        "communication_score": communication,
        "overall_feedback": feedback
    }
