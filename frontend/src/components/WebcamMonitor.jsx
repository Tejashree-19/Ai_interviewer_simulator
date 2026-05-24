import { useRef, useState } from "react";

function WebcamMonitor() {

  const videoRef = useRef(null);

  const [cameraStatus, setCameraStatus] =
    useState("Camera Off");

  const [cameraOn, setCameraOn] =
    useState(false);

  const startCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraStatus("✅ Camera Active");

      setCameraOn(true);

    } catch (error) {

      console.log(error);

      setCameraStatus(
        "❌ Camera Access Denied"
      );
    }
  };

  const stopCamera = () => {

    const stream =
      videoRef.current.srcObject;

    const tracks = stream.getTracks();

    tracks.forEach((track) =>
      track.stop()
    );

    videoRef.current.srcObject = null;

    setCameraStatus("⛔ Camera Off");

    setCameraOn(false);
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
        AI Camera Monitor
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
        {cameraStatus}
      </p>

      {!cameraOn ? (

        <button
          onClick={startCamera}
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
          Turn Camera On
        </button>

      ) : (

        <button
          onClick={stopCamera}
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
          Turn Camera Off
        </button>

      )}

    </div>
  );
}

export default WebcamMonitor;