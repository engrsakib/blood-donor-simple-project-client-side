import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* About Section */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center p-10">
        {/* Left Side Content */}
        <div className="text-left">
          <h5 className="text-red-500 text-lg font-semibold">About Us</h5>
          <h1 className="text-4xl font-bold text-gray-900 my-3">
            Together We Can Make <br /> World More Health & Better
          </h1>
          <p className="text-gray-600 leading-relaxed">
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
                <span className="text-red-500 text-lg mr-2">✔</span> Hygine
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
          <Link to={`/donations`} className="btn btn-primary mt-5 px-6 py-2">
            Donation requests
          </Link>
        </div>

        {/* Right Side Image */}
        <div className="w-full">
          <img
            src="https://thumbs.dreamstime.com/b/smiling-medical-doctor-woman-stethoscope-isolated-over-white-background-35552912.jpg" // Replace with your image URL
            alt="Blood Donation"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Best Services Section */}
      <div className="bg-red-100 py-10">
        <div className="flex flex-col lg:flex-row justify-around items-center">
          {/* Best Services */}
          <div className="text-left max-w-md">
            <h3 className="text-2xl font-bold text-gray-900">Best Services</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa.
            </p>
          </div>

          {/* Expert Staff */}
          <div className="text-left max-w-md mt-5 lg:mt-0">
            <h3 className="text-2xl font-bold text-gray-900">Expert Staff</h3>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
