import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/SignIn";

// Define the router here inside App.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/Homepage",
    element: <Homepage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
