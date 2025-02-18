import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Banner = () => {
  const { user, dark, setLoadding } = useContext(AuthContext);
    return (
      <>
        <div
          className="hero w-full h-2/3 rounded-md"
          style={{
            backgroundImage:
              "url(https://cdn.ittefaqbd.com/contents/cache/images/640x358x1/uploads/media/2024/06/14/eb5663459d5f5e1ad9c4fa7e0e172d2a-666c4ac8bf1e7.jpg?jadewits_media_id=173188)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Donate Blood, Save Lives
              </h1>
              <p className="mb-5">
                Blood donation is a noble act that saves countless lives. By
                donating blood, you can help patients suffering from accidents,
                surgeries, or life-threatening illnesses. A single donation can
                save up to three lives. It is safe, quick, and a simple way to
                make a significant difference in your community. Become a hero
                today—donate blood and give the gift of life.
              </p>
              <div className="space-x-3">
                <Link to={`/auth/register`} className={`btn btn-primary ${user && "hidden"}`}>
                  Join as a donor
                </Link>
                <Link to={"/searchdonor"} className="btn btn-secondary">
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Banner;