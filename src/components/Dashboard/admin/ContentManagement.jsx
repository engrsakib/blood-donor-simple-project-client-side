import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import {
  FaEllipsisV,
  FaTrash,
  FaUserCheck,
  FaUserEdit,
  FaUserLock,
} from "react-icons/fa";
import Loading from "../../Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ContentManagement = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  // useQuery to fetch blogs data
  const {
    isLoading: isPending,
    data: blogs = [], // Default empty array
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
  });

  // Filter blogs based on status
  const filteredBlogs = Array.isArray(blogs)
    ? statusFilter
      ? blogs.filter((blog) => blog.status === statusFilter)
      : blogs
    : [];

  // Pagination Logic
  const totalItems = filteredBlogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  // Handle delete blog
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the blog.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/blogs/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Blog has been deleted.", "success");
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting blog:", error);
            Swal.fire("Error", "Failed to delete the blog.", "error");
          });
      }
    });
  };

  // Handle toggle status
  const handleToggleStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will ${
        status === "published" ? "draft" : "publish"
      } the blog.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: status === "published" ? "Draft" : "Publish",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = status === "published" ? "draft" : "published";

        axios
          .patch(`http://localhost:5000/blogs/${id}`, { status: newStatus })
          .then(() => {
            Swal.fire(
              "Success!",
              `Blog status updated to ${newStatus}.`,
              "success"
            );
            refetch();
          })
          .catch((error) => {
            console.error("Error updating status:", error);
            Swal.fire("Error", "Failed to update blog status.", "error");
          });
      }
    });
  };

  const handleDetails = (id) => {
    navigate(`/blogs/details/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Content Management</title>
      </Helmet>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Content Management</h1>
        <div className="mb-4 flex justify-between flex-col md:flex-row">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered w-full md:w-auto"
          >
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Items per page */}
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
          <div className="overflow-x-auto min-h-screen border overflow-y-hidden rounded-lg shadow-md bg-white">
            <table className="table-auto w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-4 px-6 font-medium text-gray-600">#</th>
                  <th className="py-4 px-6 font-medium text-gray-600">Title</th>
                  <th className="py-4 px-6 font-medium text-gray-600">
                    Author
                  </th>
                  <th className="py-4 px-6 font-medium text-gray-600">
                    Created Date
                  </th>
                  <th className="py-4 px-6 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-4 px-6 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedBlogs.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                    <td className="py-4 px-6 text-gray-700">{blog.title}</td>
                    <td className="py-4 px-6 text-gray-700">{blog.author}</td>
                    <td className="py-4 px-6 text-gray-700">
                      {blog.createdAt}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleDetails(blog._id)}
                          className="flex items-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded shadow hover:bg-blue-600"
                        >
                          <FaUserEdit className="mr-2" /> Details
                        </button>
                        <button
                          onClick={() =>
                            handleToggleStatus(blog._id, blog.status)
                          }
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded shadow ${
                            blog.status === "published"
                              ? "bg-yellow-500 text-white hover:bg-yellow-600"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          {blog.status === "published" ? (
                            <>
                              <FaUserLock className="mr-2" /> Draft
                            </>
                          ) : (
                            <>
                              <FaUserCheck className="mr-2" /> Publish
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="flex items-center px-3 py-2 bg-red-500 text-white text-sm font-medium rounded shadow hover:bg-red-600"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
      </div>
    </>
  );
};

export default ContentManagement;
