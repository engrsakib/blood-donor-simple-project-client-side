import { useQuery } from "@tanstack/react-query";
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
    <Loading></Loading>;
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
        fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
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
        fetch(`http://localhost:5000/users/role/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: result.value }),
        })
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
        fetch(`http://localhost:5000/users/status/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        })
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
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
        {isPending ? (
          <Loading />
        ) : (
          <>
            <div className="overflow-x-auto min-h-screen border overflow-y-hidden">
              <table className="table w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={user.photoUrl} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm opacity-50">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.status === "active"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown dropdown-left z-50">
                          <button className="btn btn-ghost btn-xs">
                            <FaEllipsisV />
                          </button>
                          <div className="dropdown-content mt-2 p-2 w-48 bg-white shadow-lg rounded-md">
                            <button
                              onClick={() =>
                                handleToggleStatus(user._id, user.status)
                              }
                              className={`block w-full text-left btn btn-sm ${
                                user.status === "active"
                                  ? "btn-warning"
                                  : "btn-success"
                              }`}
                            >
                              {user.status === "active" ? (
                                <span className="flex gap-x-1 capitalize">
                                  <FaUserLock /> Block
                                </span>
                              ) : (
                                <span className="flex gap-x-1 capitalize">
                                  <FaUserCheck /> Unblock
                                </span>
                              )}
                            </button>
                            <button
                              onClick={() => handleChangeRole(user._id)}
                              className="block w-full text-left btn btn-sm btn-info mt-2"
                            >
                              <span className="flex capitalize gap-x-1">
                                <FaUserEdit /> Change Role
                              </span>
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="block w-full text-left btn btn-sm btn-danger mt-2"
                            >
                              <span className="flex capitalize gap-x-1">
                                <FaTrash /> Delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center">
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
          </>
        )}
      </div>
      <Helmet>
        <title>All users</title>
      </Helmet>
    </>
  );
};

export default AllUsers;
