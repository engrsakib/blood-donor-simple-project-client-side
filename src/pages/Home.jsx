import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import Banner from '../components/HomeComponents/Banner';
import AboutUs from '../components/HomeComponents/AboutUs';
import ContactForm from '../components/HomeComponents/ContactForm';

const Home = () => {
  const{user, loadding} = useContext(AuthContext)
  

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

        {/* contactus */}
        <section>
          <ContactForm></ContactForm>
        </section>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;