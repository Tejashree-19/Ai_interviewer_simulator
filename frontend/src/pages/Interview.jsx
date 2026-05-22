import { useState, useEffect } from "react";
import axios from "axios";
import WebcamMonitor from "../components/WebcamMonitor";

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

      console.log(
        "Session Created:",
        response.data.session_id
      );

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

      if (response.data.interview_complete) {

        alert(response.data.evaluation);

        return;
      }

      const nextQuestion = response.data.next_question;

	setTimeout(() => {

		setLoading(false);

		setMessages([
		    ...messages,
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
      setAnswer("");

    } catch (error) {
      console.log(error);

    }
  };

  return (
  <div>

    <WebcamMonitor />

    <h1>Interview Page</h1>

    <div>
      {messages.map((msg, index) => (
        <div key={index}>

          <strong>
            {msg.type === "user" ? "YOU" : "AI"}
          </strong>

          <p>{msg.text}</p>
import WebcamMonitor from "../components/WebcamMonitor";
import VideoRecorder from "../components/VideoRecorder";
import VoiceRecorder from "../components/VoiceRecorder";

function Interview() {

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

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          AI Mock Interview
        </h1>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "16px",
          }}
        >
          Practice interviews with AI-powered evaluation and live media analysis.
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >

        <WebcamMonitor />

        <VideoRecorder />

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >

        <VoiceRecorder />

      </div>
        </div>
      ))}
    </div>

    <textarea
      placeholder="Type your answer"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />

    <br />

    <button onClick={sendAnswer}>
      Submit
    </button>

  </div>


);
  );
}

export default Interview;
