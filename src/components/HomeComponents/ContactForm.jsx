import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const { dark } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can handle your form submission logic like sending data to an API
    // After submission, show success alert and reset the form

    Swal.fire({
      title: 'Success!',
      text: 'Message sent successfully!',
      icon: 'success',
      confirmButtonText: 'Okay'
    });

    // Show toast notification
    toast.success("Message sent successfully!");

    // Reset the form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <div
      className={`py-10 px-5 lg:px-20 ${
        dark ? " text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form Section */}
          <div className="flex-1 shadow-lg rounded-lg p-6 lg:p-10">
            <h2
              className={`text-2xl font-bold mb-4 ${
                dark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Contact with us
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`input input-bordered w-full ${
                    dark ? "bg-gray-800 text-gray-100" : "bg-gray-200"
                  }`}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`input input-bordered w-full ${
                    dark ? "bg-gray-800 text-gray-100" : "bg-gray-200"
                  }`}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`input input-bordered w-full ${
                  dark ? "bg-gray-800 text-gray-100" : "bg-gray-200"
                }`}
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={`textarea textarea-bordered w-full ${
                  dark ? "bg-gray-800 text-gray-100" : "bg-gray-200"
                }`}
                required
              />
              <button
                type="submit"
                className="btn btn-primary bg-red-500 hover:bg-red-600 text-white w-full"
              >
                Send Me
              </button>
            </form>
          </div>

          {/* Information Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              Your Contribution Can Make Someone's Life Better
            </h2>
            <p className="text-gray-400 mb-6">
              We prioritize quality and commitment by offering top-notch
              services, including 24/7 emergency support, health checkups,
              access to blood banks, and hygienic tools. Our goal is to ensure a
              healthier and better community for everyone.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Opening Hours</h3>
                <p>Tuesday - Saturday</p>
                <p>08:00 AM - 15:00 PM</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Notun Bazar, Dhaka</h3>
                  <p>Dhaka International University</p>
                  <p>Phone: (+880) 152 254 239</p>
                  <p>Email: contact@bloodbridge.com</p>
                </div>
                <div>
                  <h3 className="font-bold">Magura</h3>
                  <p>adorshopara, college gate, magura</p>
                  <p>Phone: (+880) 152 254 238</p>
                  <p>Email: contact@bloodbridge.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
