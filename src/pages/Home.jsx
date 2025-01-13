import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
  const{user} = useContext(AuthContext)
    return (
      <>
       
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;