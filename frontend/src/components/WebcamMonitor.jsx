import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function WebcamMonitor() {

  const videoRef = useRef(null);

  const [status, setStatus] =
    useState("Loading AI camera...");

  const [missingTime, setMissingTime] =
    useState(0);

  const [warning, setWarning] =
    useState(false);

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

      setStatus("Camera Active");

      detectFace();

    } catch (error) {

      console.log(error);

      setStatus("Camera Access Denied");

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

        if (missingTime > 5) {

          setWarning(true);

          setStatus("⚠ Stay Focused");

        } else {

          setStatus("No Face Detected");

        }

      } else if (detections.length > 1) {

        setMissingTime(0);

        setWarning(false);

        setStatus("Multiple Faces Detected");

      } else {

        setMissingTime(0);

        setWarning(false);

        setStatus("Face Detected");

      }

    }, 1000);
  };

  return (

    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "16px",
        width: "340px",
        color: "white",
      }}
    >

      <h3>AI Camera Monitor</h3>

      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: "100%",
          borderRadius: "12px",
          marginTop: "12px",
        }}
      />

      <p
        style={{
          marginTop: "12px",
          fontWeight: "bold",
        }}
      >
        {status}
      </p>

      <p
        style={{
          color: "#9CA3AF",
          fontSize: "14px",
        }}
      >
        Missing Time: {missingTime}s
      </p>

      {warning && (

        <div
          style={{
            marginTop: "12px",
            padding: "10px",
            background: "#7F1D1D",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ⚠ Please stay focused
        </div>

      )}

    </div>
  );
}

export default WebcamMonitor;
