import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Blogs = () => {
    return (
      <>
        <Helmet>
          <title>Blogs</title>
        </Helmet>
        {/* My Blogs page start */}

        <div className="min-h-[1/2] w-full ml-3 p-4 mx-auto rounded-lg flex flex-col justify-between">
          {/* button */}
          <div className="flex flex-row justify-end items-center mb-4 gap-4">
            <Link
              to={`/dashboard/content-management/add-blog`}
              className="btn btn-warning"
            >
              Create a blogs
            </Link>
          </div>
        </div>
      </>
    );
};

export default Blogs;