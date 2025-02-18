import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import Banner from '../components/HomeComponents/Banner';
import AboutUs from '../components/HomeComponents/AboutUs';
import ContactForm from '../components/HomeComponents/ContactForm';
import PhotoGallery from './PhotoGallery';
import TrendingBoard from './TrendingBoard';
import FAQ from './FAQ';

const Home = () => {
  const{user, loadding, dark} = useContext(AuthContext);
  

    return (
      <>
        {/* banner section */}
        <section className=''>
          <Banner></Banner>
        </section>
        {/* about us section */}
        <section>
          <AboutUs></AboutUs>
        </section>
        {/* photo */}
        <section>
          <PhotoGallery></PhotoGallery>
        </section>
        <section>
          <TrendingBoard></TrendingBoard>
        </section>
        {/* contactus */}
        <section>
          <FAQ></FAQ>
        </section>
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