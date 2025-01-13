import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import Banner from '../components/HomeComponents/Banner';
import AboutUs from '../components/HomeComponents/AboutUs';

const Home = () => {
  const{user} = useContext(AuthContext)
    return (
      <>
        {/* banner section */}
        <section>
          <Banner></Banner>
        </section>
        {/* about us section */}
        <section>
          <AboutUs></AboutUs>
        </section>



        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;