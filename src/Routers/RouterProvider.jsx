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
import Details from "../components/Dashboard/Donor/Details";
import AllDonations from "../components/Dashboard/Donor/AllDonations";
import AllDonationsHome from "../components/Dashboard/Donor/AllDonationsHome";
import Blogs from "../components/Dashboard/Donor/Blogs";
import CreateBlogs from "../components/Dashboard/Donor/CreateBlogs";
import ContentManagement from "../components/Dashboard/admin/ContentManagement";
import BlogsDetials from "../components/Dashboard/Donor/BlogsDetials";
import Search from "../components/Dashboard/Donor/Search";
import Foundme from "../components/Dashboard/user/AllUsers/Foundme";
import AddFund from "../components/Dashboard/user/AllUsers/AddFund";

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
        path: "/donationrequests",
        element: <AllDonationsHome></AllDonationsHome>,
      },
      {
        path: "/searchdonor",
        element: <Search></Search>,
      },
      {
        path: "/blogs/details/:id",
        element: (
          <Privete>
            <BlogsDetials></BlogsDetials>
          </Privete>
        ),
      },
      {
        path: "/fundme",
        element: (
          
            <Foundme></Foundme>
        
        ),
      },
      {
        path: "/blogs/details/:id",
        element: (
          <Privete>
            <BlogsDetials></BlogsDetials>
          </Privete>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
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
        path: "/dashboard/content-management/add-blog",
        element: (
          <Privete>
            <CreateBlogs></CreateBlogs>
          </Privete>
        ),
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: (
          <Privete>
            <AllDonations></AllDonations>
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
        path: "/dashboard/donation/detiels/:id",
        element: (
          <Privete>
            <Details></Details>
          </Privete>
        ),
      },
      {
        path: "/dashboard/fundme/add-fund",
        element: (
          <Privete>
            <AddFund></AddFund>
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

      {
        path: "/dashboard/content-management",
        element: (
          <Privete>
            <Admin>
              <ContentManagement></ContentManagement>
            </Admin>
          </Privete>
        ),
      },
    ],
  },
]);

export default router;
