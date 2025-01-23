import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../../Loading";
import Swal from "sweetalert2"; // Import Swal
import { useNavigate } from "react-router-dom";
import useGetAllUsers from "../user/AllUsers/useGetAllUsers";

const AllDonations = () => {
  const { user } = useContext(AuthContext);
  const { users } = useGetAllUsers(user);
  const email = user?.email;
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 per page

  const {
    isLoading: isPending,
    data: donations = [],
    refetch,
  } = useQuery({
    queryKey: ["donations", email],
    queryFn: async () => {
      const response = await axios.get(
        `https://blood-donation-server-liard.vercel.app/donations`
      );
      return response.data;
    },
  });

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDetailsClick = (donation) => {
    navigate(`/dashboard/donation/detiels/${donation}`);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const confirmed = await Swal.fire({
      title: `Are you sure you want to change the status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      await axios.patch(
        `https://blood-donation-server-liard.vercel.app/donations/${id}`,
        {
          status: newStatus,
        }
      );
      refetch();
      Swal.fire("Success!", `Status updated to ${newStatus}.`, "success");
    }
  };

  const handleEditClick = (id) => {
    Swal.fire({
      title: "Are you sure you want to edit this donation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Edit it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/donation/edit/${id}`);
      }
    });
  };

  const handleDeleteClick = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure you want to delete this donation request?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      await axios.delete(
        `https://blood-donation-server-liard.vercel.app/donations/${id}`
      );
      refetch();
      Swal.fire("Deleted!", "Donation request has been deleted.", "success");
    }
  };

  if (isPending) return <Loading />;

  const filteredDonations = statusFilter
    ? donations.filter((donation) => donation.status === statusFilter)
    : donations;

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen w-full ml-3 p-4 mx-auto rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          My Donation Requests
        </h1>

        <div className="flex flex-row justify-between items-center mb-4 gap-4">
          <select
            className="select select-bordered w-40"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>

          <select
            className="select select-bordered w-40"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donation Date</th>
                <th>District</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDonations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{donation?.recipientName}</td>
                  <td>{donation?.bloodGroup}</td>
                  <td>{donation?.status}</td>
                  <td>{donation?.donationDate}</td>
                  <td>{donation?.district}</td>
                  <td className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDetailsClick(donation._id)}
                    >
                      Details
                    </button>
                    {donation.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            handleStatusUpdate(donation._id, "done")
                          }
                        >
                          Mark as Done
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleStatusUpdate(donation._id, "canceled")
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      className={`btn btn-sm btn-info ${
                        users.role === "volunteer" && "hidden"
                      }`}
                      onClick={() => handleEditClick(donation._id)}
                    >
                      Edit
                    </button>
                    <button
                      className={`btn btn-sm btn-error ${
                        users.role === "volunteer" && "hidden"
                      }`}
                      onClick={() => handleDeleteClick(donation._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-4 sticky bottom-0 bg-base-200 py-4">
        <div className="btn-group">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`btn ${page === currentPage ? "btn-active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDonations;
