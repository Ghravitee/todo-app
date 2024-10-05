// src/main.jsx (or index.jsx)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import your App component
import "./index.css"; // Import any global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);
