import Homepage from "./pages/Homepage/Homepage"; // Your Todo App component
import SignIn from "./pages/Signin/SignIn";
import Signup from "./pages/";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            {" "}
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
