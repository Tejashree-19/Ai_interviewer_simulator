import { useState } from "react";

function VoiceRecorder({ setAnswer }) {

  const [transcript, setTranscript] =
    useState("");

  const [listening, setListening] =
    useState(false);

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  const recognition =
    new SpeechRecognition();

  recognition.continuous = true;

  recognition.interimResults = true;

  recognition.onresult = (event) => {

    let currentTranscript = "";

    for (
      let i = 0;
      i < event.results.length;
      i++
    ) {

      currentTranscript +=
        event.results[i][0].transcript;

    }

    setTranscript(currentTranscript);

    setAnswer(currentTranscript.trim());
  };

  const startListening = () => {

    recognition.start();

    setListening(true);

  };

  const stopListening = () => {

    recognition.stop();

    setListening(false);

  };

  return (

    <div
      style={{
        width: "420px",
        padding: "24px",
        borderRadius: "24px",
        background:
          "rgba(30,41,59,0.75)",
        backdropFilter: "blur(12px)",
        border:
          "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.35)",
        color: "white",
      }}
    >

      <h2
        style={{
          marginBottom: "18px",
          fontSize: "24px",
          fontWeight: "bold",
          background:
            "linear-gradient(to right, #60A5FA, #A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Speech Recognition
      </h2>

      {listening && (

        <p
          style={{
            color: "#22C55E",
            fontWeight: "bold",
            marginBottom: "14px",
          }}
        >
          🎤 Listening...
        </p>

      )}

      {!listening ? (

        <button
          onClick={startListening}
          style={{
            width: "100%",
            background:
              "linear-gradient(to right, #7C3AED, #2563EB)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow:
              "0 4px 14px rgba(124,58,237,0.35)",
          }}
        >
          Start Listening
        </button>

      ) : (

        <button
          onClick={stopListening}
          style={{
            width: "100%",
            background:
              "linear-gradient(to right, #DC2626, #EF4444)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow:
              "0 4px 14px rgba(220,38,38,0.35)",
          }}
        >
          Stop Listening
        </button>

      )}

      {/* <div
        style={{
          marginTop: "18px",
          background:
            "rgba(15,23,42,0.85)",
          padding: "16px",
          borderRadius: "16px",
          minHeight: "140px",
          border:
            "1px solid rgba(255,255,255,0.08)",
          lineHeight: "1.7",
          fontSize: "15px",
          color: "#CBD5E1",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.2)",
        }}
      >

        {transcript ||
          "Speech transcript appears here..."}

      </div> */}

    </div>

  );
}

export default VoiceRecorder;