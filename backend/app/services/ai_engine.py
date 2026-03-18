def generate_question(answer: str) -> str:
    answer = answer.lower()

    keywords = {
        "python": "What are decorators in Python?",
        "sql": "What is normalization in databases?",
        "database": "Explain ACID properties.",
        "api": "What is REST API?",
        "react": "What are hooks in React?"
    }

    for key in keywords:
        if key in answer:
            return keywords[key]

    return "Can you explain that in more detail?"