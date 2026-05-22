import WebcamMonitor from "../components/WebcamMonitor";
import VideoRecorder from "../components/VideoRecorder";
import VoiceRecorder from "../components/VoiceRecorder";

function Interview() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        padding: "30px",
        color: "white",
      }}
    >

      <div
        style={{
          marginBottom: "30px",
          textAlign: "center",
        }}
      >

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          AI Mock Interview
        </h1>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "16px",
          }}
        >
          Practice interviews with AI-powered evaluation and live media analysis.
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >

        <WebcamMonitor />

        <VideoRecorder />

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >

        <VoiceRecorder />

      </div>

    </div>

  );
}

export default Interview;