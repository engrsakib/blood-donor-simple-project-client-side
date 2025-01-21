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
            <div className='mt-2 flex justify-end items-end'>
                <button onClick={()=>{navigate(`/dashboard/fundme/add-fund`);}} className='btn btn-outline btn-wide btn-info'>Add Fund</button>
            </div>
        </>
    );
};

export default Foundme;