import { useState, useEffect } from "react";
import axios from "axios";

import WebcamMonitor from "../components/WebcamMonitor";
import VideoRecorder from "../components/VideoRecorder";
import VoiceRecorder from "../components/VoiceRecorder";

function Interview() {

  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/session"
      );

      setSessionId(response.data.session_id);

    } catch (error) {

      console.log(error);

    }
  };

  const sendAnswer = async () => {

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/answer",
        {
          answer: answer,
          session_id: sessionId,
        }
      );

      const nextQuestion =
        response.data.next_question;

      setTimeout(() => {

        setLoading(false);

        setMessages((prev) => [
          ...prev,
          {
            type: "user",
            text: answer,
          },
          {
            type: "ai",
            text: nextQuestion,
          },
        ]);

        setAnswer("");

      }, 2000);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        padding: "30px",
        color: "white",
      }}
    >

      <div
        style={{
          marginBottom: "30px",
          textAlign: "center",
        }}
      >

        <h1>AI Mock Interview</h1>

        <p>
          Practice interviews with AI-powered evaluation.
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >

        <WebcamMonitor />

        <VideoRecorder />

      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >

        <VoiceRecorder />

      </div>

      <div
        style={{
          marginTop: "40px",
          maxWidth: "800px",
          marginInline: "auto",
        }}
      >

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
            }}
          >

            <strong>
              {msg.type === "user"
                ? "YOU"
                : "AI"}
            </strong>

            <p>{msg.text}</p>

          </div>
        ))}

        {loading && (
          <p>
            AI is analyzing your response...
          </p>
        )}

        <textarea
          placeholder="Type your answer"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          style={{
            width: "100%",
            minHeight: "120px",
            marginTop: "20px",
            padding: "16px",
            borderRadius: "12px",
          }}
        />

        <button
          onClick={sendAnswer}
          style={{
            marginTop: "16px",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>

      </div>

    </div>
  );
}

export default Interview;
