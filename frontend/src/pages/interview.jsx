import { useState } from "react";
import axios from "axios";

function Interview() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const sendAnswer = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/answer",
        {
          answer: answer,
        }
      );

      setQuestion(response.data.next_question);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Interview Page</h1>

      <textarea
        placeholder="Type your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <br />

      <button onClick={sendAnswer}>Submit</button>

      <h2>{question}</h2>
    </div>
  );
}

export default Interview;