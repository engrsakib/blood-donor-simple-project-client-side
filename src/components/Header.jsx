import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoSun } from "react-icons/go";
import { FaMoon, FaUserCircle } from "react-icons/fa";
import { auth } from "../Firebase/firebase.congig";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import useGetAllUsers from "./Dashboard/user/AllUsers/useGetAllUsers";
import Loading from "./Loading";

const Header = () => {
  const { setdark, dark, user } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { users, refetch, isPending } = useGetAllUsers(user);

  if (isPending) {
    return <Loading />;
  }
  refetch();

  const singOut = () => {
    Swal.fire({
      title: "Do you want to Sign Out?",
      showDenyButton: true,
      confirmButtonText: "Sign Out",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire("Signed Out!", "", "success");
          })
          .catch((error) => {
            console.error("Sign-out error:", error);
          });
      } else if (result.isDenied) {
        Swal.fire("You stayed logged in", "", "info");
      }
    });
  };

  const handletheme = () => {
    setdark(!dark);
  };

  const links = (
    <>
      {["Home", "Donation requests", "Blogs", "Search donor"].map(
        (link, index) => (
          <NavLink
            key={index}
            to={`${
              link === "Home"
                ? "/"
                : `/${link.toLowerCase().replace(" ", "")}`
            }`}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive
                  ? "bg-green-500 text-white"
                  : "bg-transparent hover:bg-red-400"
              } ${dark ? "text-gray-50" : "text-gray-800"}`
            }
          >
            {link}
          </NavLink>
        )
      )}
      {/* Fund me Link - Only Visible When Users Exist */}
      {users && (
        <NavLink
          to="/fundme"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "bg-green-500 text-white"
                : "bg-transparent hover:bg-red-400"
            } ${dark ? "text-gray-50" : "text-gray-800"}`
          }
        >
          Fund me
        </NavLink>
      )}
    </>
  );

  return (
    <div
      className={`navbar ${
        dark ? "bg-gray-900 text-gray-50" : "bg-gray-100 text-gray-900"
      } rounded-lg p-3 shadow-md`}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow ${
              dark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className={`text-2xl font-bold ${
            dark ? "text-red-400" : "text-red-800"
          }`}
        >
          BloodBridge
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Theme Toggle */}
        <button onClick={handletheme} className="btn btn-circle">
          {dark ? (
            <GoSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-indigo-600 text-xl" />
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="btn btn-ghost btn-circle"
          >
            {user ? (
              <div className="tooltip" data-tip={users.name}>
                <img
                  className="rounded-full shadow-lg"
                  src={users.photoUrl || user.photoURL}
                  alt=""
                  data-tip={user.name}
                />
              </div>
            ) : (
              <FaUserCircle className="text-2xl" />
            )}
          </button>
          {showUserMenu && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg ${
                dark ? "bg-gray-800 text-gray-50" : "bg-gray-50 text-gray-900"
              }`}
            >
              {!user ? (
                <div className="p-2">
                  <Link
                    to="/auth/login"
                    className="block px-4 py-2 hover:bg-gray-200 rounded"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block px-4 py-2 hover:bg-gray-200 rounded"
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <div className="p-2">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200 rounded"
                  >
                    dashboard
                  </Link>
                  <button
                    onClick={singOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
