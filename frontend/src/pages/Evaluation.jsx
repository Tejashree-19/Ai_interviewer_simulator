function Evaluation() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #0F172A)",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "bold",
          background:
            "linear-gradient(to right, #22C55E, #06B6D4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:
            "transparent",
          marginBottom: "40px",
          lineHeight: "1.3",
paddingBottom: "10px",
        }}
      >
        Interview Evaluation
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >

        <div
          style={{
            background:
              "rgba(30,41,59,0.7)",
            padding: "28px",
            borderRadius: "22px",
            width: "240px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#22C55E",
            }}
          >
            Overall Score
          </h2>

          <p
            style={{
              fontSize: "52px",
              fontWeight: "bold",
            }}
          >
            8.5
          </p>
        </div>

        <div
          style={{
            background:
              "rgba(30,41,59,0.7)",
            padding: "28px",
            borderRadius: "22px",
            width: "240px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#60A5FA",
            }}
          >
            Confidence
          </h2>

          <p
            style={{
              fontSize: "52px",
              fontWeight: "bold",
            }}
          >
            92%
          </p>
        </div>

        <div
          style={{
            background:
              "rgba(30,41,59,0.7)",
            padding: "28px",
            borderRadius: "22px",
            width: "240px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              color: "#F59E0B",
            }}
          >
            Communication
          </h2>

          <p
            style={{
              fontSize: "52px",
              fontWeight: "bold",
            }}
          >
            87%
          </p>
        </div>

      </div>

      <div
        style={{
          marginTop: "50px",
          maxWidth: "900px",
          marginInline: "auto",
          background:
            "rgba(30,41,59,0.7)",
          padding: "30px",
          borderRadius: "24px",
          backdropFilter: "blur(10px)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            color: "#A78BFA",
          }}
        >
          AI Feedback
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            color: "#CBD5E1",
          }}
        >
          Strong understanding of technical concepts and good communication skills.
          Try improving answer structure and explaining scalability concepts more clearly.
        </p>

      </div>

    </div>

  );
}

export default Evaluation;