import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Content for child routes */}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Menu
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content */}
          <Link to={'/'}>
            <h1 className="text-red-950 uppercase text-center text-2xl font-bold">
              BloodBridge
            </h1>
          </Link>
          <h3 className="text-xl text-center capitalize">dashboard</h3>
          {/* admin Dashboard */}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
