import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import LogIn from "../auth/LogIn";
import Register from "./Register";
import Fourzero from "../components/Fourzero";
import Public from "./Public";
import Profile from "../pages/Profile";
import Privete from "./Privete";
import Dashboard from "../components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Fourzero></Fourzero>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/auth/login",
        element: (
          <Public>
            <LogIn></LogIn>
          </Public>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Public>
            <Register></Register>
          </Public>
        ),
      },

      
      // dashboard work
      {
        path: "/dashboard",
        element: (
          <Privete>
            <Dashboard></Dashboard>
          </Privete>
        ),
      },
    ],
  },
]);

export default router;
