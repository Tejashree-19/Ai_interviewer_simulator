import { useEffect, useRef, useState } from "react";

function WebcamMonitor() {

  const videoRef = useRef(null);

  const [cameraStatus, setCameraStatus] =
    useState("Starting camera...");

  const [stream, setStream] =
    useState(null);

  const [cameraOn, setCameraOn] =
    useState(true);

  useEffect(() => {

    startCamera();

  }, []);

  const startCamera = async () => {

    try {

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      if (videoRef.current) {

        videoRef.current.srcObject =
          mediaStream;

      }

      setStream(mediaStream);

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

    if (stream) {

      stream.getTracks().forEach(
        (track) => track.stop()
      );

      if (videoRef.current) {

        videoRef.current.srcObject = null;

      }

      setCameraStatus("⛔ Camera Off");

      setCameraOn(false);

    }
  };

  return (

    <div
      style={{
        padding: "20px",
        background: "#1E293B",
        borderRadius: "12px",
        color: "white",
        width: "380px",
        marginBottom: "20px",
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
        AI Camera Monitor
      </h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="320"
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

      {cameraOn ? (

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
            marginTop: "10px",
          }}
        >
          Turn Camera Off
        </button>

      ) : (

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
            marginTop: "10px",
          }}
        >
          Turn Camera On
        </button>

      )}

    </div>

  );
}

export default WebcamMonitor;
