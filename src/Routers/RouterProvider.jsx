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
import User from "../components/Dashboard/user/User";
import DashboardHome from "../components/Dashboard/DashboardHome";
import UserEdit from "../components/Dashboard/user/UserEdit";
import AllUsers from "../components/Dashboard/user/AllUsers/AllUsers";
import Admin from "./Admin";
import CreateDonations from "../components/Dashboard/Donor/CreateDonations";
import MyDonations from "../components/Dashboard/Donor/MyDonations";
import MyDonationEidit from "../components/Dashboard/Donor/MyDonationEidit";

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
    ],
  },
  // dashboard work
  {
    path: "/dashboard",
    element: (
      <Privete>
        <Dashboard></Dashboard>
      </Privete>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Privete>
            <DashboardHome></DashboardHome>
          </Privete>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <Privete>
            <User></User>
          </Privete>
        ),
      },
      {
        path: "/dashboard/profile/edit",
        element: (
          <Privete>
            <UserEdit></UserEdit>
          </Privete>
        ),
      },
      {
        path: "/dashboard/create-donation-request",
        element: (
          <Privete>
            <CreateDonations></CreateDonations>
          </Privete>
        ),
      },
      {
        path: "/dashboard/my-donation-requests",
        element: (
          <Privete>
            <MyDonations></MyDonations>
          </Privete>
        ),
      },
      {
        path: "/dashboard/donation/edit/:id",
        element: (
          <Privete>
            <MyDonationEidit></MyDonationEidit>
          </Privete>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <Privete>
            <Admin>
              <AllUsers></AllUsers>
            </Admin>
          </Privete>
        ),
      },
    ],
  },
]);

export default router;
