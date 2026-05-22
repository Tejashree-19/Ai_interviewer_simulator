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

  const startCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      if (videoRef.current) {

        videoRef.current.srcObject = stream;

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

      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: "100%",
          borderRadius: "12px",
          marginTop: "10px",
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
  );
}

export default WebcamMonitor;
