import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AdminStatistics from "./admin/AdminStatistics";
import useGetAllUsers from "./user/AllUsers/useGetAllUsers";
import MyDonationsPro from "./Donor/MyDonationsPro";

const DashboardHome = () => {
  const { user, dark } = useContext(AuthContext);
  const { users, refetch, isPending } = useGetAllUsers(user);
  return (
    <>
      {/* all dashbord */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back{" "}
          <span className="italic uppercase">{users?.name || "Guest"}</span>,
          ready for your contributions?
        </h1>
      </div>
      {/* only for admin and volunteer */}
      <section>
        {(users.role == "admin" || users.role == "volunteer") && (
          <AdminStatistics></AdminStatistics>
        )}
      </section>
      {/* only for admin and volunteer */}
      {/* only for admin and volunteer */}
      <section>
        {(users.role == "donor") && (
          <MyDonationsPro></MyDonationsPro>
        )}
      </section>
      {/* only for admin and volunteer */}
    </>
  );
};

export default DashboardHome;
