import { useRef, useState } from "react";

function VideoRecorder() {

  const videoRef = useRef(null);

  const mediaRecorderRef = useRef(null);

  const chunksRef = useRef([]);

  const [recording, setRecording] =
    useState(false);

  const [status, setStatus] =
    useState("Recorder Idle");

  const startRecording = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder =
        new MediaRecorder(stream);

      mediaRecorderRef.current =
        mediaRecorder;

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (
        event
      ) => {

        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {

        const blob = new Blob(
          chunksRef.current,
          {
            type: "video/webm",
          }
        );

        const videoURL =
          URL.createObjectURL(blob);

        console.log(videoURL);

        setStatus(
          "✅ Recording Saved"
        );
      };

      mediaRecorder.start();

      setRecording(true);

      setStatus(
        "🎥 Recording in Progress"
      );

    } catch (error) {

      console.log(error);

      setStatus(
        "❌ Camera/Mic Access Denied"
      );
    }
  };

  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    const stream =
      videoRef.current.srcObject;

    const tracks = stream.getTracks();

    tracks.forEach((track) =>
      track.stop()
    );

    videoRef.current.srcObject = null;

    setRecording(false);
  };

  return (

    <div
      style={{
        width: "340px",
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
        AI Video Recorder
      </h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="100%"
        height="240"
        style={{
          borderRadius: "16px",
          background: "black",
          objectFit: "cover",
          border:
            "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.25)",
        }}
      />

      <p
        style={{
          marginTop: "16px",
          marginBottom: "18px",
          fontWeight: "bold",
          color: "#CBD5E1",
        }}
      >
        {status}
      </p>

      {!recording ? (

        <button
          onClick={startRecording}
          style={{
            width: "100%",
            background:
              "linear-gradient(to right, #2563EB, #7C3AED)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            transition: "0.3s",
            boxShadow:
              "0 4px 14px rgba(59,130,246,0.4)",
          }}
        >
          Start Recording
        </button>

      ) : (

        <button
          onClick={stopRecording}
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
            transition: "0.3s",
            boxShadow:
              "0 4px 14px rgba(220,38,38,0.35)",
          }}
        >
          Stop Recording
        </button>

      )}

    </div>
  );
}

export default VideoRecorder;