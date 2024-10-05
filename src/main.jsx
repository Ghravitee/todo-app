import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage/Homepage";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/SignIn";

const router = createBrowserRouter([
  {
    path: "/Homepage",
    element: <Homepage />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
