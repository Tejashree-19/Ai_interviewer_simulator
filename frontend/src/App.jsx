import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Interview from "./pages/Interview";
import Evaluation from "./pages/Evaluation";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Interview />}
        />

        <Route
          path="/evaluation"
          element={<Evaluation />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;