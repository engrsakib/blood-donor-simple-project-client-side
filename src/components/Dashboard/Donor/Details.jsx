import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GrStatusWarning } from "react-icons/gr";
import Modal from "react-modal";
import useGetAllUsers from "../user/AllUsers/useGetAllUsers";

const Details = () => {
  const { dark, setActive, active } = useContext(AuthContext);
  const [disabled, setdisabled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { users } = useGetAllUsers(user);

  const {
    isLoading: isPending,
    data: data = [],
    refetch,
  } = useQuery({
    queryKey: ["donations", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://blood-donation-server-liard.vercel.app/donations/edit/${id}`
      );
      return response.data;
    },
  });

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

  useEffect(() => {
    if (
      status === "canceled" ||
      status === "done" ||
      status === "inprogress" ||
      users.status === "blocked"
    ) {
      setdisabled(true);
    }
  }, [status, users.status]);
  //   console.log(users.status)
  // Handle modal toggle
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newStatus = "inprogress";
    const confirmed = await Swal.fire({
      title: `Are you sure you want to donations"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    // console.log(newStatus)
    if (confirmed.isConfirmed) {
      await axios.patch(
        `https://blood-donation-server-liard.vercel.app/donations/${_id}`,
        {
          status: newStatus,
        }
      );
      refetch();
      setModalIsOpen(!modalIsOpen);
      Swal.fire("Success!", `Your contributions is recorded`, "success");
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
          <h1 className="text-3xl font-bold mt-4">{bloodGroup} Donation</h1>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold badge ">
              <GrStatusWarning /> {status}{" "}
            </span>
          </p>
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
            onClick={toggleModal}
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
          </ul>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Donate"
      >
        <h2 className="text-xl font-bold">Donate Blood</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={users.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="my-4">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleSubmit;
              }}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Donations Details</title>
      </Helmet>
    </>
  );
};

export default Details;
