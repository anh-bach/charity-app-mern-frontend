import React, { Fragment } from 'react';

import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const AdminDashboard = () => {
  return (
    <Fragment>
      <DashboardHorizontalNav title='Dashboard Overview' />
      <span>Admin Dashboard Page</span>
    </Fragment>
  );
};

export default AdminDashboard;
