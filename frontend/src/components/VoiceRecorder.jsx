import { useState } from "react";

function VoiceRecorder() {

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
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        width: "420px",
        marginTop: "20px",
        border: "1px solid #334155",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      }}
    >

      <h2
        style={{
          marginBottom: "15px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Speech Recognition
      </h2>
      {listening && (

  <p
    style={{
      color: "#22C55E",
      fontWeight: "bold",
      marginBottom: "10px",
    }}
  >
    🎤 Listening...
  </p>

)}

      {!listening ? (

        <button
          onClick={startListening}
          style={{
            background: "#7C3AED",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Start Listening
        </button>

      ) : (

        <button
          onClick={stopListening}
          style={{
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Stop Listening
        </button>

      )}

      <div
        style={{
          marginTop: "15px",
          background: "#0F172A",
          padding: "12px",
          borderRadius: "8px",
          minHeight: "140px",
          border: "1px solid #334155",
          lineHeight: "1.6",
          fontSize: "15px",
        }}
      >

        {transcript ||
          "Speech transcript appears here..."}

      </div>

    </div>

  );
}

export default VoiceRecorder;