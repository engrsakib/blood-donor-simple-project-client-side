import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import { AuthContext } from "../../../provider/AuthProvider";
import parse from "html-react-parser";

const Blogs = () => {
  const { dark, user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const {
    isLoading: isPending,
    data: blogs = [], // Default value to avoid undefined issues
    refetch,
  } = useQuery({
    queryKey: ["home-blogs"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://blood-donation-server-liard.vercel.app/blogs/status"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
  });
  refetch();
  console.log(blogs);
  if (isPending) {
    return <Loading />;
  }

  // Pagination Logic
  const totalItems = blogs?.length || 0; // Handle undefined blogs
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBlogs =
    blogs?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || []; // Ensure paginatedBlogs is always an array

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const GoDetails = (id) => {
    navigate(`/blogs/details/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>

      <div
        className={`min-h-screen w-full p-6 mx-auto rounded-lg flex flex-col justify-between ${
          dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Create Blog Button */}
        {/* <div className="flex flex-row justify-end items-center mb-6 gap-4">
          <Link
            to={`/dashboard/content-management/add-blog`}
            className="btn btn-warning"
          >
            Create a Blog
          </Link>
        </div> */}

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedBlogs.map((blog) => (
            <div
              key={blog?._id}
              className={`relative card shadow-xl transform transition-transform duration-300 hover:scale-105 ${
                dark
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-300"
              } rounded-lg overflow-hidden`}
            >
              <div className="relative">
                <img
                  src={blog?.thumbnail}
                  alt={blog?.title}
                  className="h-48 w-full object-cover"
                />
                {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition duration-300">
                  <button
                    onClick={() => {
                      GoDetails(blog?._id);
                    }}
                    className="btn btn-primary text-white"
                  >
                    Details
                  </button>
                </div> */}
              </div>
              <div className="p-6">
                <h2 className="font-bold text-xl mb-3">
                  {blog?.title?.split(" ").slice(0, 8).join(" ")}
                </h2>

                <div className="flex flex-row justify-between gap-2">
                  <p className="text-sm text-gray-600 mb-2">
                    {" "}
                    <span className="font-semibold">{blog?.author}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {" "}
                    <span className="font-semibold">
                      {blog?.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </p>
                </div>
                <p className="text-justify">
                  {parse(
                    blog?.content?.split(" ").slice(0, 20).join(" ") + " ......"
                  )}
                </p>
              </div>
              <div className="bg-transparent mb-3 inset-0 flex items-center justify-center  bg-opacity-50 transition duration-300">
                <button
                  onClick={() => {
                    GoDetails(blog?._id);
                  }}
                  className={`${!user && "hidden"} btn btn-info btn-outline btn-link btn-neutral text-white`}
                >
                  read more
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-auto flex flex-col md:flex-row justify-between items-center border-t pt-6 mt-8">
          {/* Items Per Page */}
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="select select-bordered"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>

          {/* Page Buttons */}
          <div className="mt-4 md:mt-0 flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`btn btn-sm mx-1 ${
                  currentPage === index + 1
                    ? "btn-primary"
                    : dark
                    ? "btn-outline text-white"
                    : "btn-outline"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
