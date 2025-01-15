import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../../Loading";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    isLoading: isPending,
    data: donations = [],
    refetch,
  } = useQuery({
    queryKey: ["donations", email],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/donations/${email}`
      );
      return response.data;
    },
  });

  if (isPending) return <Loading />;

  // Filter donations based on status
  const filteredDonations = statusFilter
    ? donations.filter((donation) => donation.status === statusFilter)
    : donations;

  // Pagination calculations
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handleDetailsClick = (donation) => {
    alert(
      `Details of Donation:\nRequester: ${donation.requesterName}\nBlood Group: ${donation.bloodGroup}\nStatus: ${donation.status}\nDonation Date: ${donation.donationDate}`
    );
  };

  return (
    <div className="p-4 ml-4 w-full mx-auto bg-base-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        My Donation Requests
      </h1>

      {/* Filter and Items Per Page Options */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Requester Name</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDonations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{donation.requesterName}</td>
                <td>{donation.bloodGroup}</td>
                <td>{donation.status}</td>
                <td>{donation.donationDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleDetailsClick(donation)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
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

export default MyDonations;
