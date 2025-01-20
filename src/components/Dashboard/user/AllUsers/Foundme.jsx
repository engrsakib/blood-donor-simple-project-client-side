import React from 'react';
import { Helmet } from 'react-helmet';

const Foundme = () => {
    return (
        <>
            <Helmet>
                <title>Fund pages</title>
            </Helmet>
            {/* button */}
            <div className='mt-2 flex justify-end items-end'>
                <button className='btn btn-outline btn-wide btn-info'>Add Fund</button>
            </div>
        </>
    );
};

export default Foundme;