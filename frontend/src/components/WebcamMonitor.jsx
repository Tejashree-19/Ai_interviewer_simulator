import { useEffect, useRef, useState } from "react";

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
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        width: "420px",
        border: "1px solid #334155",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.25)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        AI Camera Monitor
      </h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="380"
        height="220"
        style={{
          borderRadius: "10px",
          background: "black",
        }}
      />

      <p
        style={{
          marginTop: "12px",
          fontWeight: "bold",
        }}
      >
        {cameraStatus}
      </p>

      {!cameraOn ? (
        <button
          onClick={startCamera}
          style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Turn Camera On
        </button>
      ) : (
        <button
          onClick={stopCamera}
          style={{
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Turn Camera Off
        </button>
      )}
    </div>
  );
}

export default WebcamMonitor;