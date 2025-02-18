import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const AboutUs = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div
      className={`${
        dark ? " text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {/* About Section */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center p-5 lg:p-10">
        {/* Left Side Content */}
        <div className="text-left">
          <h5 className="text-red-500 text-lg font-semibold">About Us</h5>
          <h1 className="text-3xl md:text-4xl font-bold my-3">
            Together We Can Make <br /> World More Health & Better
          </h1>
          <p className="leading-relaxed">
            Blood donation is a noble act that saves countless lives. By
            donating blood, you can help patients suffering from accidents,
            surgeries, or life-threatening illnesses. A single donation can save
            up to three lives. It is safe, quick, and a simple way to make a
            significant difference in your community. Become a hero today—donate
            blood and give the gift of life.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="text-red-500 text-lg mr-2">✔</span> Good
                Service
              </li>
              <li className="flex items-center">
                <span className="text-red-500 text-lg mr-2">✔</span> Help People
              </li>
              <li className="flex items-center">
                <span className="text-red-500 text-lg mr-2">✔</span> Hygienic
                Tools
              </li>
            </ul>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="text-red-500 text-lg mr-2">✔</span> 24h Service
              </li>
              <li className="flex items-center">
                <span className="text-red-500 text-lg mr-2">✔</span> Health
                Check
              </li>
              <li className="flex items-center">
                <span className="text-red-500 text-lg mr-2">✔</span> Blood Bank
              </li>
            </ul>
          </div>

          {/* About Us Button */}
          <Link
            to={`/donationrequests`}
            className="btn btn-primary mt-5 px-6 py-2"
          >
            Donation Requests
          </Link>
        </div>

        {/* Right Side Image */}
        <div className="w-full">
          <img
            src="https://thumbs.dreamstime.com/b/smiling-medical-doctor-woman-stethoscope-isolated-over-white-background-35552912.jpg" // Replace with your image URL
            alt="Blood Donation"
            className="rounded-lg w-full object-cover"
          />
        </div>
      </div>

      {/* Best Services Section */}
      <div
        className={`${
          dark ? "bg-gray-800 text-gray-300" : "bg-red-100 text-gray-900"
        } py-10`}
      >
        <div className="flex flex-col lg:flex-row justify-around items-center space-y-8 lg:space-y-0">
          {/* Best Services */}
          <div className="text-left max-w-md px-5 lg:px-0">
            <h3 className="text-2xl font-bold">Best Services</h3>
            <p className="mt-2">
              We prioritize quality and commitment by offering top-notch
              services, including 24/7 emergency support, health checkups,
              access to blood banks, and hygienic tools. Our goal is to ensure a
              healthier and better community for everyone.
            </p>
          </div>

          {/* Expert Staff */}
          <div className="text-left max-w-md px-5 lg:px-0">
            <h3 className="text-2xl font-bold">Expert Staff</h3>
            <p className="mt-2">
              Our team of highly trained and experienced professionals ensures
              the best care and support for every individual. They are dedicated
              to providing efficient, compassionate, and expert-level
              assistance, making your experience smooth and reliable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
