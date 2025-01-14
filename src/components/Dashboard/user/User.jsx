import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
// Adjust the import path
import { GrStatusWarning } from "react-icons/gr";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
const User = () => {
  const { user, dark } = useContext(AuthContext);
    const navigate = useNavigate();
   
    const {
      isPending,
      data: users = [],
      refetch,
    } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        if (!user?.email) {
          return []; 
        }
        const response = await fetch(
          `http://localhost:5000/users/${user.email}`
        );
        const data = await response.json();
        return data;
      },
    });
    if(isPending)(
        <Loading></Loading>
    )
    
    refetch();
    

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
                <img src={user.photoUrl} alt="User Profile" />
              </div>
            </div>
            <h2 className="mt-4 text-lg font-bold">{user.name}</h2>
            <p className="text-sm capitalize badge">{user.role}</p>
            <p className="text-sm flex gap-x-1 items-center justify-center">
              <GrStatusWarning /> {user.status}
            </p>
            <p className="text-sm">{user.email}</p>
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
            <button onClick={handleEdit} className="btn btn-circle btn-outline btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M9 11l-4.5 4.5a2.121 2.121 0 102.121 2.121L11 15m4-4l4.5-4.5a2.121 2.121 0 00-2.121-2.121L9 11"
                ></path>
              </svg>
            </button>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Blood Grupe</p>
              <p className="font-medium">{user.bloodGroup}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">District</p>
              <p className="font-medium">{user.district}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 capitalize">upazila</p>
              <p className="font-medium">{user.upazila}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Donations</p>
              <p className="font-medium">{user?.last || "N/A"}</p>
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
  );
};

export default User;
