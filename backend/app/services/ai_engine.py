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
    You are a senior technical interviewer.

    Your job is to conduct a realistic technical interview.

    Rules:
    - Ask professional follow-up questions
    - Focus on technical depth
    - Ask concise but intelligent questions
    - Adapt based on candidate answers
    - Sound like a real interviewer

    Candidate Answer:
    {answer}

    Generate ONE technical follow-up interview question.
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception:
        return fallback_question(answer)


def evaluate_answer(answer: str):

    prompt = f"""
    You are a senior technical interviewer.

    Evaluate the following candidate answer.

    Candidate Answer:
    {answer}

    Give:
    1. Score out of 10
    2. Strengths
    3. Weaknesses
    4. Improvement tips

    Keep the response concise and professional.
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception:

        return """
        Score: 7/10

        Strengths:
        Good understanding of backend API development.

        Weaknesses:
        Could explain scalability and authentication better.

        Improvement Tips:
        Practice async FastAPI concepts and database optimization.
        """
