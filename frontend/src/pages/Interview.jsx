import { useState } from "react";

import WebcamMonitor from "../components/WebcamMonitor";
import VoiceRecorder from "../components/VoiceRecorder";
import VideoRecorder from "../components/VideoRecorder";

function Interview() {

  const [answer, setAnswer] =
    useState("");

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0F172A, #1E293B)",
        padding: "40px",
        color: "white",
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          background:
            "linear-gradient(to right, #60A5FA, #A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          lineHeight: "1.3",
          paddingBottom: "10px",
        }}
      >
        AI Mock Interview
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#CBD5E1",
          marginTop: "10px",
          fontSize: "16px",
        }}
      >
        Practice interviews with AI-powered evaluation.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "40px",
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

      <VoiceRecorder setAnswer={setAnswer} />
      </div>

      <div
        style={{
          marginTop: "40px",
          maxWidth: "850px",
          marginInline: "auto",
          background:
            "rgba(30,41,59,0.7)",
          padding: "30px",
          borderRadius: "24px",
          backdropFilter: "blur(10px)",
        }}
      >

        <strong
          style={{
            color: "#93C5FD",
            fontSize: "14px",
          }}
        >
          AI INTERVIEWER
        </strong>

        <p
          style={{
            background:
              "rgba(15,23,42,0.85)",
            padding: "18px",
            borderRadius: "18px",
            marginTop: "10px",
          }}
        >
          Tell me about yourself.
        </p>

        <textarea
          placeholder="Type your answer..."
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          style={{
            width: "100%",
            minHeight: "140px",
            marginTop: "20px",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            background:
              "rgba(15,23,42,0.75)",
            color: "white",
          }}
        />

        <button
          style={{
            marginTop: "18px",
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(to right, #3B82F6, #8B5CF6)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Submit Answer
        </button>

      </div>

    </div>

  );
}

export default Interview;
