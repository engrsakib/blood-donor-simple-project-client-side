import React from 'react';
import { DNA, MagnifyingGlass } from 'react-loader-spinner';

const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        
      </div>
    );
};

export default Loading;