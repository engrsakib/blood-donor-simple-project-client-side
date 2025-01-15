import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
// Adjust the import path
import { GrStatusWarning } from "react-icons/gr";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { FaPen } from "react-icons/fa";
import useGetAllUsers from "./AllUsers/useGetAllUsers";
import axios from "axios";
import { Helmet } from "react-helmet";
const User = () => {
  const { user, dark, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
   
    
    const { users, refetch, isPending } = useGetAllUsers(user);
    // console.log(users)
    if(isPending)(
        <Loading></Loading>
    )
    refetch();
    
    // console.log(user)

  // Fixed user data
  const handleEdit = () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard/profile/edit");
      }
    });
  }
  
  return (
    <>
      <div
        className={`p-4 sm:p-6 lg:p-8 ${
          dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Profile Card */}
          <div
            className={`card shadow-xl h-[310px] p-6 rounded-lg ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={users?.photoUrl} alt="User Profile" />
                </div>
              </div>
              <h2 className="mt-4 text-lg font-bold">{users?.name}</h2>
              <p className="text-sm capitalize badge">{users?.role}</p>
              <p className="text-sm flex gap-x-1 items-center justify-center">
                <GrStatusWarning /> {users?.status}
              </p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div
            className={`col-span-2 card shadow-xl p-6 rounded-lg ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">My Profile</h3>
              <button
                onClick={handleEdit}
                className="btn btn-circle btn-outline btn-sm"
              >
                <FaPen />
              </button>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Blood Grupe</p>
                <p className="font-medium">{users?.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p className="font-medium">{users?.district}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 capitalize">upazila</p>
                <p className="font-medium">{users?.upazila}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Donations</p>
                <p className="font-medium">{users?.last || "N/A"}</p>
              </div>
            </div>
            <div className="mt-6">
              {/* <h3 className="text-xl font-bold">Device Activity</h3> */}
              <div className="divider"></div>
              {/* Add device activity details here */}
              {/* <p className="text-sm text-gray-500">No activity detected yet.</p> */}
            </div>
          </div>
        </div>
      </div>
      <Helmet>
        <title>{`${users.name} home`}</title>
      </Helmet>
    </>
  );
};

export default User;
