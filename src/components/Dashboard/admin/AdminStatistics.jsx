import React, { useContext } from "react";

import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import { AuthContext } from "../../../provider/AuthProvider";
import useGetusers from "../user/AllUsers/useGetusers";
import useGetallDonations from "../Donations/useGetallDonations";
import useGetTaka from "../user/AllUsers/useGetTaka";

const AdminStatistics = () => {
  const { user, dark } = useContext(AuthContext);
  const { users,  } = useGetusers();
  const { donations } = useGetallDonations(); 
  const { TK, refetch, isPending } = useGetTaka();
  refetch();
  // Fixed data
  const stats = [
    {
      title: "Total Donors",
      count: users.length,
      icon: <FaUsers className="text-4xl text-primary" />,
    },
    {
      title: "Total Funding",
      count: TK.total,
      icon: <FaHandHoldingHeart className="text-4xl text-secondary" />,
    },
    {
      title: "Blood Requests",
      count: donations.length,
      icon: <FaTint className="text-4xl text-red-500" />,
    },
  ];

  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 ${
        dark ? " text-white" : " text-gray-900"
      }`}
    >
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`card w-72 md:w-96 shadow-xl p-4 rounded-lg flex items-center gap-4 ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 rounded-full bg-gray-200">
              {stat.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{stat.count}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStatistics;
