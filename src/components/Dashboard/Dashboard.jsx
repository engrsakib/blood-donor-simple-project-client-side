import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { MdMenu, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { Helmet } from "react-helmet";
import { FaUserGraduate } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useGetAllUsers from "./user/AllUsers/useGetAllUsers";
import Loading from "../Loading";

const Dashboard = () => {
  const {user, dark} = useContext(AuthContext);
  // console.log(user)

  const { users, refetch, isPending } = useGetAllUsers(user);

  if (isPending) {
    <Loading></Loading>;
  }
  refetch();




  const adminDashboard = (
    <>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${isActive ? "btn-active" : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard/all-users"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${
            (users?.role == "donor" || users?.role == "volunteer") && "hidden"
          }`
        }
      >
        All users
      </NavLink>
      <NavLink
        to="/dashboard/all-blood-donation-request"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${users?.role == "donor" && "hidden"}`
        }
      >
        All Blood Donation Request
      </NavLink>
      <NavLink
        to="/dashboard/content-management"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${users?.role == "donor" && "hidden"}`
        }
      >
        Content Management
      </NavLink>
    </>
  );

  const donorMenu = (
    <>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${(users?.role == "admin" || user?.role == "volunteer") && "hidden"}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard/my-donation-requests"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${isActive ? "btn-active" : ""}`
        }
      >
        My Donation Requests Page
      </NavLink>

      <NavLink
        to="/dashboard/create-donation-request"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${isActive ? "btn-active" : ""}`
        }
      >
        Create Donation Request
      </NavLink>
    </>
  );

  return (
    <>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary btn-outline float-end drawer-button lg:hidden"
      >
        <MdMenu />
      </label>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Content for child routes */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-orange-800 rounded-lg text-base-content min-h-full w-80 p-4">
            {/* Sidebar content */}
            <Link to={"/"}>
              <h1 className="text-slate-50 uppercase text-center text-2xl font-bold">
                BloodBridge
              </h1>
            </Link>
            <h3 className="text-xl text-center capitalize">dashboard</h3>
            {/* user icons and profile start */}
            <section className="flex flex-col justify-center items-center mt-3">
              <img
                className="rounded-full border shadow h-[60px] w-[60px]"
                src={users.photoUrl}
                alt="userPhoto"
              />
              <h1 className="flex gap-x-1 items-center text-white text-lg">
                {" "}
                <FaUserGraduate /> {users?.name}
              </h1>
              <h1 className="flex gap-x-1 items-center text-white text-sm">
                {" "}
                <MdOutlineDriveFileRenameOutline /> {users?.role}
              </h1>
              <Link
                to={"/dashboard/profile"}
                className="btn btn-outline btn-info btn-wide mt-1"
              >
                profile
              </Link>
              <Link
                to={"/"}
                className="btn btn-outline bg-white btn-wide mt-1"
              >
                Go to website
              </Link>
            </section>
            {/* user icons and profile end */}

            {/* menu start */}
            <section className="mt-2 flex flex-col justify-between items-center gap-y-16">
              {/* user and admin dashboard start */}
              <div>
                {/* admin Dashboard start*/}
                {(users?.role == "admin" || users?.role == "volunteer") && (
                  <section className="mt-2">
                    {/* icons */}
                    <div className="flex justify-start items-center gap-3 text-white text-xl">
                      <RiAdminFill />{" "}
                      <h4 className="capitalize">
                        {users?.role === "admin"
                          ? "admin"
                          : users?.role === "volunteer"
                          ? "volunteer"
                          : "donor"}
                      </h4>
                    </div>
                    {/* menue */}
                    <menu className="mt-1 flex flex-col gap-y-2 justify-center items-center">
                      {adminDashboard}
                    </menu>
                    {/* menue */}
                  </section>
                )}
                {/* admin Dashboard end*/}

                <section className="mt-2">
                  {/* icons */}
                  <div className="flex justify-start items-center gap-3 text-white text-xl">
                    <RiAdminFill /> <h4 className="capitalize">donor</h4>
                  </div>
                  {/* menue */}
                  <menu className="mt-1 flex flex-col gap-y-2 justify-center items-center">
                    {donorMenu}
                  </menu>
                  {/* menue */}
                </section>
              </div>
              {/* user and admin dashboard end */}
              {/* all section start */}
              {/* all section end */}
            </section>
            {/* menu start */}
          </ul>
        </div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
      </div>
    </>
  );
};

export default Dashboard;
