import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-interviewer-simulator-ot7c.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
