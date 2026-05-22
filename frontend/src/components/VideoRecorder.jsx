import { useRef, useState } from "react";
import axios from "axios";

function VideoRecorder() {

  const videoRef = useRef(null);

  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [recording, setRecording] = useState(false);

  const chunksRef = useRef([]);

  const startRecording = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {

        const blob = new Blob(
          chunksRef.current,
          {
            type: "video/webm",
          }
        );

        const videoURL =
          URL.createObjectURL(blob);
          const formData = new FormData();

formData.append(
  "file",
  blob,
  "interview-recording.webm"
);

try {

  const response = await axios.post(
    "http://127.0.0.1:8000/upload-video",
    formData
  );

  console.log(response.data);

} catch (error) {

  console.log(error);

}

        chunksRef.current = [];
      };

      recorder.start();

      setMediaRecorder(recorder);

      setRecording(true);

    } catch (error) {

      console.log(error);

    }
  };

  const stopRecording = () => {

    mediaRecorder.stop();

    setRecording(false);

  };

  return (

    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        width: "380px",
        paddingBottom: "52px",
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
  Video Recorder
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

    <div
  style={{
    marginTop: "15px",
  }}
>

  {recording && (

    <p
      style={{
        color: "#EF4444",
        fontWeight: "bold",
        marginBottom: "10px",
      }}
    >
      🔴 Recording...
    </p>

  )}

  {!recording ? (

        <button
  onClick={startRecording}
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
  Start Recording
</button>

        ) : (

        <button
  onClick={stopRecording}
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
  Stop Recording
</button>

        )}

      </div>

    </div>

  );
}

export default VideoRecorder;