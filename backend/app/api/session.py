from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Session

router = APIRouter()

@router.post("/session")
def create_session():

    db = SessionLocal()

    new_session = Session(
        user_id=1,
        role="candidate"
    )

    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return {
        "message": "Session created",
        "session_id": new_session.id
    }
