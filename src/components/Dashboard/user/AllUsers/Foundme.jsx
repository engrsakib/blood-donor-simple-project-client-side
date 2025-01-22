import React from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate } from 'react-router-dom';

const Foundme = () => {
    const navigate = useNavigate();
    
    return (
      <>
        <Helmet>
          <title>Fund pages</title>
        </Helmet>
        {/* button */}
        {/* button section */}
        <section className='mt-4 flex justify-between items-center'>
            <h2 className='text-xl text-info'>Fund Pages</h2>
            <h2 className='text-xl text-info'>Total Funds: </h2>
            
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
      </>
    );
};

export default Foundme;