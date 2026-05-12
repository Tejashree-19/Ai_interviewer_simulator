import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

def fallback_question(answer):

    answer = answer.lower()

    keywords = {
        "python": "What are decorators in Python?",
        "sql": "Explain normalization in databases.",
        "api": "What is REST API?",
        "react": "What are hooks in React?"
    }

    for key in keywords:
        if key in answer:
            return keywords[key]

    return "Can you explain that in more detail?"


def generate_question(answer: str) -> str:

    prompt = f"""
    You are a professional technical interviewer.

    Candidate answer:
    {answer}

    Ask one intelligent follow-up interview question.
    """

    try:
        response = model.generate_content(prompt)
        return response.text

    

    except Exception:
        return fallback_question(answer)