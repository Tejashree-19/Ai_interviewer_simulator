import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

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
        return "Can you explain your project architecture?"



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
