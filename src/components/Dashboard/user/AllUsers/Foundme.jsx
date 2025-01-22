import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate } from 'react-router-dom';
import useGetAllFunds from './useGetAllFunds';
import Loading from '../../../Loading';

const Foundme = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
    const { funds, refetch, isPending } = useGetAllFunds();
    if(isPending){
        return <Loading></Loading>
    }

    console.log(funds)
    return (
      <>
        <Helmet>
          <title>Fund pages</title>
        </Helmet>
        {/* button */}
        {/* button section */}
        <section className="mt-4 flex justify-between items-center">
          <h2 className="text-xl text-info">Fund Pages</h2>
          <h2 className="text-xl text-info">Total Funds: </h2>

          <div className="mt-2 flex justify-end items-end">
            <button
              onClick={() => {
                navigate(`/dashboard/fundme/add-fund`);
              }}
              className="btn btn-outline btn-wide btn-info"
            >
              Add Fund
            </button>
          </div>
        </section>
        {/* button section */}
        {/* table */}
        <div className="overflow-x-auto">
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
              {funds.map((donation, index) => (
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
        {/* end */}
      </>
    );
};

export default Foundme;