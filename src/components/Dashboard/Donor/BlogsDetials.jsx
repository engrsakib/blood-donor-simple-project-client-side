import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import { AuthContext } from "../../../provider/AuthProvider";
import parse from "html-react-parser"; // HTML Parser

const BlogsDetails = () => {
  const { id } = useParams();
  const { dark } = useContext(AuthContext); // Context for dark mode
  const { isLoading: isPending, data: blogs = {} } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://blood-donation-server-liard.vercel.app/blogs/details/${id}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return {};
      }
    },
  });

  if (isPending) {
    return <Loading />;
  }

  const { title, thumbnail, content, author, createdAt } = blogs;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div
        className={`min-h-screen ${
          dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <Helmet>
          <title>Blogs Details</title>
        </Helmet>

        <div className="max-w-4xl mx-auto p-4">
          {/* Blog Title */}
          <h1
            className={`text-2xl md:text-4xl font-bold mb-4 text-center ${
              dark ? "text-white" : "text-gray-800"
            }`}
          >
            {title}
          </h1>

          {/* Blog Image */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
            <img
              src={
                thumbnail ||
                "https://img.freepik.com/free-vector/search-concept-landing-page_52683-18606.jpg?t=st=1737215741~exp=1737219341~hmac=8f433da3db95f313098f112af64c5c168cd7f79b8870b927249b290ebe2a87ce&w=740"
              }
              alt={title}
              className="w-full h-full border shadow object-cover"
            />
          </div>

          {/* Blog Meta */}
          <div
            className={`flex justify-between items-center text-sm mt-4 ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <p>
              <span className="font-medium">Author:</span> {author || "Unknown"}
            </p>
            <p>
              <span className="font-medium">Published:</span>{" "}
              {createdAt || "N/A"}
            </p>
          </div>

          {/* Blog Content */}
          <div
            className={`mt-6 leading-relaxed ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {content ? parse(content) : "No content available for this blog."}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsDetails;
