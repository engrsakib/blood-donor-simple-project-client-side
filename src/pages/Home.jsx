import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import Banner from '../components/HomeComponents/Banner';

const Home = () => {
  const{user} = useContext(AuthContext)
    return (
      <>
        {/* banner section */}
        <section>
          <Banner></Banner>
        </section>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;