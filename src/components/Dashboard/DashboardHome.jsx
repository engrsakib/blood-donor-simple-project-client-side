import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import AdminStatistics from './admin/AdminStatistics';

const DashboardHome = () => {
    const {user, dark} = useContext(AuthContext);
    return (
      <>
      {/* all dashbord */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back <span className="italic uppercase">{user?.name || "Guest"}</span>,
            ready for your contributions?
          </h1>
        </div>
        {/* only for admin */}
        <section>
            <AdminStatistics></AdminStatistics>
        </section>
        {/* only for admin */}

      </>
    );
};

export default DashboardHome;