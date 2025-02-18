import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useGetAllFunds from "./useGetAllFunds";
import Loading from "../../../Loading";
import useGetTaka from "./useGetTaka";
import { AuthContext } from "../../../../provider/AuthProvider";

const Foundme = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { funds, refetch, isPending } = useGetAllFunds();
  const { TK } = useGetTaka();
  const { user, dark, setLoadding } = useContext(AuthContext);
  refetch();
  if (isPending) {
    return <Loading />;
  }

  // Pagination calculations
  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const paginatedFunds = funds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Fund pages</title>
      </Helmet>
      {/* button */}
      {/* button section */}
      <section className="mt-4 flex justify-between items-center max-sm:flex-col">
        <h2 className="text-xl text-info">Fund Pages</h2>
        <h2 className="text-xl text-info">Total Funds: {TK.total} USD</h2>

        <div className="mt-2 flex justify-end items-end">
          <button
            onClick={() => {
              navigate(`/dashboard/fundme/add-fund`);
            }}
            className={`btn btn-outline btn-wide btn-info ${!user && "hidden"}`}
          >
            Add Fund
          </button>
        </div>
      </section>
      {/* button section */}
      {/* table */}
      <div className="overflow-x-auto min-h-screen">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Transaction</th>
              <th>Date and Time</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFunds.map((donation, index) => (
              <tr key={donation._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={donation?.img}
                    alt={donation?.name}
                  />
                </td>
                <td>{donation?.name}</td>
                <td>{donation?.email}</td>
                <td>{donation?.transaction}</td>
                <td>{donation?.date}</td>
                <td>{donation?.amount} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-4 sticky bottom-0 bg-base-200 py-4">
        <div className="mb-4">
          <select
            className="select select-bordered w-40"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
        <div className="btn-group">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`btn ${page === currentPage ? "btn-active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Foundme;
