import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../../Loading";
import Swal from "sweetalert2"; // Import Swal
import { Link, useNavigate } from "react-router-dom";

const MyDonationsPro = () => {
  const { user } = useContext(AuthContext);
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
        `https://blood-donation-server-liard.vercel.app/donations/home/${email}`
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

  if (donations.length == 0) {
    return (
      <>
        <img
          src="https://i.ibb.co.com/J5R5d7X/flat-design-no-data-illustration-23-2150527139.jpg"
          alt="No data founds"
        />
      </>
    );
  }
  return (
    <div className="min-h-[1/2] w-full ml-3 p-4 mx-auto rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          My Latest Donation
        </h1>

        <div className="flex flex-row justify-end items-center mb-4 gap-4">
          <Link
            to={`/dashboard/my-donation-requests`}
            className="btn btn-warning"
          >
            View All
          </Link>
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
                      className="btn btn-sm btn-info"
                      onClick={() => handleEditClick(donation._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
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
    </div>
  );
};

export default MyDonationsPro;
