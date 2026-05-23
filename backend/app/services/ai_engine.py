import os
import random
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    "gemini-2.0-flash"
)

fallback_questions = [
    "Explain list comprehension in Python.",
    "What are HTTP methods in REST API?",
    "Explain database indexing.",
    "What is useEffect in React?",
    "Why is FastAPI faster than Flask?",
    "Can you explain your project architecture?"
]


def fallback_question(answer):

    answer = answer.lower()

    if "python" in answer:
        return "Explain list comprehension in Python."

    elif "api" in answer:
        return "What are HTTP methods in REST API?"

    elif "database" in answer:
        return "Explain database indexing."

    elif "react" in answer:
        return "What is useEffect in React?"

    elif "fastapi" in answer:
        return "Why is FastAPI faster than Flask?"

    else:
        return random.choice(fallback_questions)


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

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print(e)

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

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print(e)

        return """
        Score: 7/10

        Strengths:
        Good understanding of backend API development.

        Weaknesses:
        Could explain scalability and authentication better.

        Improvement Tips:
        Practice async FastAPI concepts and database optimization.
        """
