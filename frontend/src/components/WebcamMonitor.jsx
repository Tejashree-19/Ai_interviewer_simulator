import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function WebcamMonitor() {

  const videoRef = useRef(null);

  const [status, setStatus] = useState("Loading AI camera...");
  const [missingTime, setMissingTime] = useState(0);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {

    try {

      await faceapi.nets.tinyFaceDetector.loadFromUri(
        "/models"
      );

      startCamera();

    } catch (error) {

      console.log(error);

      setStatus("Failed to load AI models");

    }
  };

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

      const stream =
      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      if (videoRef.current) {

        videoRef.current.srcObject = stream;

      }

      setStatus("Camera Active");

      detectFace();
        videoRef.current.srcObject =
          mediaStream;

      }

      setStream(mediaStream);

      setCameraStatus("✅ Camera Active");

      setCameraOn(true);

    } catch (error) {

      console.log(error);

      setStatus("Camera Access Denied");
      setCameraStatus(
        "❌ Camera Access Denied"
      );

    }
  };

  const detectFace = () => {

    setInterval(async () => {

      if (!videoRef.current) return;

      const detections =
        await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

      if (detections.length === 0) {

        setMissingTime((prev) => prev + 1);

        setStatus("No Face Detected");
	if (missingTime > 5) {

 		 setStatus("Stay Focused");

	} else {

		  setStatus("No Face Detected");

	}


      } else if (detections.length > 1) {

        setMissingTime(0);

        setStatus("Multiple Faces Detected");

      } else {

        setMissingTime(0);

        setStatus("Face Detected");

      }

    }, 1000);
  };

  return (
    <div
      style={{
        background: "#1f1f1f",
        padding: "16px",
        borderRadius: "16px",
        width: "340px",
        color: "white",
      }}
    >

      <h3>AI Camera Monitor</h3>
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
        style={{
          width: "100%",
          borderRadius: "12px",
          marginTop: "10px",
        width="320"
        height="220"
        style={{
          borderRadius: "10px",
          background: "black",
        }}
      />

      <p
        style={{
          marginTop: "10px",
          color: "#9ae6b4",
          fontWeight: "bold",
        }}
      >
        {status}
      </p>

      <p
        style={{
          color: "#aaa",
          fontSize: "14px",
        }}
      >
        Missing Time: {missingTime}s
      </p>

    </div>
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
