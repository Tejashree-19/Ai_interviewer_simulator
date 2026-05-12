import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

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

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception:
        return fallback_question(answer)