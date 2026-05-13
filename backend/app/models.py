from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)

    sessions = relationship(
        "Session",
        back_populates="user",
        cascade="all, delete"
    )


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String)
    started_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="sessions")

    questions = relationship(
        "Question",
        back_populates="session",
        cascade="all, delete"
    )


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    question_text = Column(Text)
    question_order = Column(Integer)

    session = relationship("Session", back_populates="questions")

    answers = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete"
    )


class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    answer_text = Column(Text)

    question = relationship("Question", back_populates="answers")
