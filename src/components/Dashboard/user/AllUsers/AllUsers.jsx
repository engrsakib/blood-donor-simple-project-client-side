import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaEllipsisV,
  FaTrash,
  FaUserEdit,
  FaUserLock,
  FaUserCheck,
} from "react-icons/fa";
import Loading from "../../../Loading";
import useGetusers from "./useGetusers";
import { Helmet } from "react-helmet";

const AllUsers = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { users, refetch, isPending } = useGetusers();

  if (isPending) {
    return <Loading />;
  }

  // Filter users based on status
  const filteredUsers = statusFilter
    ? users.filter((user) => user.status === statusFilter)
    : users;

  // Pagination Logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  // Handle delete user
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://blood-donation-server-liard.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            refetch();
          })
          .catch((error) => console.error("Error deleting user:", error));
      }
    });
  };

  // Handle change role
  const handleChangeRole = (id) => {
    Swal.fire({
      title: "Change Role",
      input: "select",
      inputOptions: {
        donor: "Donor",
        admin: "Admin",
        volunteer: "Volunteer",
      },
      inputPlaceholder: "Select a role",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://blood-donation-server-liard.vercel.app/users/role/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: result.value }),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Success!", "Role updated successfully.", "success");
            refetch();
          })
          .catch((error) => console.error("Error updating role:", error));
      }
    });
  };

  // Handle toggle status
  const handleToggleStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will ${status === "active" ? "block" : "unblock"} the user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: status === "active" ? "Block" : "Unblock",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = status === "active" ? "blocked" : "active";
        fetch(
          `https://blood-donation-server-liard.vercel.app/users/status/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire(
              "Success!",
              `User status updated to ${newStatus}.`,
              "success"
            );
            refetch();
          })
          .catch((error) => console.error("Error updating status:", error));
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>All Users</title>
      </Helmet>

      <div className="container mx-auto p-6 ">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        {/* Filters */}
        <div className="mb-4 flex justify-between flex-col md:flex-row">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered w-full md:w-auto"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="select select-bordered w-full md:w-auto"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg shadow-lg">
          <table className="table-auto w-full text-left bg-white">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody >
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3">
                        <img
                          src={user.photoUrl}
                          alt="Avatar"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleToggleStatus(user._id, user.status)
                        }
                        className="btn btn-xs btn-warning"
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </button>
                      <button
                        onClick={() => handleChangeRole(user._id)}
                        className="btn btn-xs btn-info"
                      >
                        Change Role
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-xs btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-sm mx-1 ${
                currentPage === index + 1 ? "btn-primary" : "btn-ghost"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
