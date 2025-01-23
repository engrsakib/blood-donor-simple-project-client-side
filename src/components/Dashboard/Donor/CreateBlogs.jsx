import React, { useContext, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import useGetAllUsers from "../user/AllUsers/useGetAllUsers";
import HTMLReactParser from "html-react-parser";

const CreateBlogs = () => {
  const { user, dark } = useContext(AuthContext);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const { users, refetch, isPending } = useGetAllUsers(user);
  const name = users.name;
  const email = users.email;

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return Swal.fire("Error", "Please upload an image!", "error");
    }

    // Validate file type and size
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      return Swal.fire(
        "Error",
        "Only PNG, JPG, JPEG files are allowed!",
        "error"
      );
    }
    if (file.size > 1240 * 1024) {
      return Swal.fire(
        "Error",
        "Image size should not exceed 1240 KB!",
        "error"
      );
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`, // Replace with your ImgBB API key
        formData
      );
      setThumbnail(response.data.data.display_url);
      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to upload image!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (!title || !thumbnail || !content) {
      return Swal.fire("Error", "All fields are required!", "error");
    }

    const blogData = {
      title,
      thumbnail,
      content,
      author: name || "Anonymous",
      email: email || "No email",
      createdAt: new Date().toISOString().split("T")[0],
      status: "draft",
    };

    try {
      const response = await axios.post(
        "https://blood-donation-server-liard.vercel.app/blogs",
        blogData
      );
      if (response) {
        Swal.fire("Success", "Blog created successfully!", "success");
        // Clear the form fields
        setTitle("");
        setContent("");
        setThumbnail(null);
        navigate("/blogs");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to create blog!", "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Blog</title>
      </Helmet>

      <div
        className={`min-h-screen p-6 ${
          dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Create a Blog</h1>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter blog title"
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block font-medium mb-2">Thumbnail Image</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleThumbnailUpload}
                className="file-input file-input-bordered w-full"
              />
              {loading && (
                <p className="text-sm text-blue-500 mt-2">Uploading image...</p>
              )}
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Thumbnail preview"
                  className="mt-4 w-40 h-40 object-cover rounded-md"
                />
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="">
              <label className="block font-medium mb-2">Content</label>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                config={{
                  readonly: false,
                  height: 500,
                  textAlign: "left",
                }}
                onBlur={(newContent) => setContent(newContent)}
                onSubmit={(newContent) => {
                  setContent(newContent);
                }}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlogs;
