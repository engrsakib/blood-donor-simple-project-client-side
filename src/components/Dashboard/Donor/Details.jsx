import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cleanPath } from "@tanstack/react-router";
import { GrStatusWarning } from "react-icons/gr";

const Details = () => {
  const { dark, setActive, active } = useContext(AuthContext);
  const [disabled, setdisabled] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // console.log(data[0])
  const { id } = useParams();
  // console.log(id)
  const {
    isLoading: isPending,
    data: data = [],
    refetch,
  } = useQuery({
    queryKey: ["donations", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/donations/edit/${id}`
      );
      return response.data;
    },
  });

  console.log(data);
  const {
    recipientName,
    district,
    upazila,
    hospital,
    address,
    bloodGroup,
    donationDate,
    donationTime,
    requestMessage,
    requesterName,
    _id,
    email,
    status,
  } = data;
  
  useEffect(()=>{
    if (status == "canceled" || status == "done" || status == "inprogress") {
      setdisabled(true);
    }
  },[status])
  // donetation section handel
  const handleDonate = (id) => {
    if (active) {
      if (name === user.name) {
        Swal.fire({
          icon: "error",
          title: "Donation Faild",
          text: `You can't donated in your own campagion`,
        });
        return;
      }
      navigate(`/donation/all-campagion/details/donated/${id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Donations date!",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-16 py-8">
        {/* Left Section */}
        <div className="flex-1">
          <img
            src={`https://i.ibb.co.com/hDR0Z6f/friendly-hospital-phlebotomist-collecting-blood-sample-from-patient-lab-preparation-blood-test-by-fe.jpg`}
            alt="Fundraiser"
            className="rounded-lg shadow-md w-full h-[400px] object-cover"
          />
          <h1 className="text-3xl font-bold mt-4">{}</h1>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold badge ">
              <GrStatusWarning /> {status}{" "}
            </span>
          </p>
          <div
            className={`${
              active ? "bg-green-400" : "bg-red-400"
            } mt-4 p-4 rounded-md`}
          ></div>
          <p className={`${dark ? "text-gray-200" : "text-gray-800"} mt-4`}>
            {requestMessage}
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{bloodGroup} needed</h2>
          <p className="text-gray-600">
            Name: {requesterName} <br /> Mail: {email}
          </p>

          <button
            disabled={disabled}
            onClick={() => {
              handleDonate(_id);
            }}
            className="btn btn-primary w-full my-2"
          >
            Donate Now
          </button>

          <h3 className="mt-6 text-lg font-semibold">Other Informations</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <p className="font-medium">Recipient Name</p>
              <p className="text-gray-500">{recipientName}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">District</p>
              <p className="text-gray-500">{district}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Upazila</p>
              <p className="text-gray-500">{upazila}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Hospital</p>
              <p className="text-gray-500">{hospital}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Address</p>
              <p className="text-gray-500">{address}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Donation Date</p>
              <p className="text-gray-500">{donationDate}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Donation Time</p>
              <p className="text-gray-500">{donationTime}</p>
            </li>
            {/* <li className="flex justify-between">
              <p className="font-medium">Davinder Sapra</p>
              <p className="text-gray-500">$5,000</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Anonymous</p>
              <p className="text-gray-500">$500</p>
            </li> */}
          </ul>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Donations Details</title>
      </Helmet>
    </>
  );
};

export default Details;
