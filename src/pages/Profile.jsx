import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const {dark, user} = useContext(AuthContext);
    return (
      <>
        <div
          className={`flex justify-center items-center min-h-screen ${
            dark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="card w-full max-w-md bg-base-100 shadow-lg rounded-lg p-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photo}
                    alt="User Avatar"
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="text-center mt-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">
                {dark ? "Night Mode" : "Light Mode"}
              </p>
            </div>

            <div className="mt-6">
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Username:</span>
                  <span>engrsakib</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Country:</span>
                  <span className="flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/w40/bd.png"
                      alt="Bangladesh Flag"
                      className="w-5 h-5 rounded-full"
                    />
                    Bangladesh
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Student/Professional:</span>
                  <span>Student</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Institution:</span>
                  <span>Dhaka International University</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold">Create Time:</span>
                  <span className="text-error">{user.crateDate}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Helmet>
          <title>User profile</title>
        </Helmet>
      </>
    );
};

export default Profile;