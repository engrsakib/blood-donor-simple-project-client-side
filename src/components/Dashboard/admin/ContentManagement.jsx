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

const ContentManagement = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // useQuery to fetch blogs data
  const {
    isLoading: isPending,
    data: blogs = [],
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
//   console.log(blogs)
  // Filter blogs based on status
  const filteredBlogs = statusFilter
    ? blogs.filter((blog) => blog.status === statusFilter)
    : blogs;

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
        fetch(`http://localhost:5000/blogs/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Blog has been deleted.", "success");
            refetch();
          })
          .catch((error) => console.error("Error deleting blog:", error));
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

       // Using Axios to send the PATCH request to the backend
       axios
         .patch(`http://localhost:5000/blogs/${id}`, { status: newStatus })
         .then((response) => {
           Swal.fire(
             "Success!",
             `Blog status updated to ${newStatus}.`,
             "success"
           );
           refetch(); // Refetch data after status update
         })
         .catch((error) => {
           console.error("Error updating status:", error);
           Swal.fire("Error", "Failed to update blog status.", "error");
         });
     }
   });
 };


  const handleDetails = (id)=>{
    console.log(id)
  }

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

        {/* Loading indicator */}
        {isPending ? (
          <Loading />
        ) : (
          <>
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="table w-full min-h-screen border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>created Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <td>{index + 1}</td>
                      <td>{blog.title}</td>
                      <td>{blog.author}</td>
                      <td>{blog.createdAt}</td>
                      <td>
                        <span
                          className={`badge ${
                            blog.status === "published"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown dropdown-left z-50">
                          <button className="btn btn-ghost btn-xs">
                            <FaEllipsisV />
                          </button>
                          <div className="dropdown-content z-50 mt-2 p-2 w-48 bg-white shadow-lg rounded-md">
                            <button
                              onClick={() => handleDetails(blog._id)}
                              className="block w-full text-left btn btn-sm btn-danger mt-2 mb-2"
                            >
                              <span className="flex capitalize gap-x-1">
                                <FaUserEdit /> Details
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleToggleStatus(blog._id, blog.status)
                              }
                              className={`block w-full text-left btn btn-sm ${
                                blog.status === "published"
                                  ? "btn-warning"
                                  : "btn-success"
                              }`}
                            >
                              {blog.status === "published" ? (
                                <span className="flex gap-x-1 capitalize">
                                  <FaUserLock /> Draft
                                </span>
                              ) : (
                                <span className="flex gap-x-1 capitalize">
                                  <FaUserCheck /> Publish
                                </span>
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
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
    </>
  );
};

export default ContentManagement;
