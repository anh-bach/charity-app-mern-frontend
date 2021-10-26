import React, { Fragment } from 'react';
import { useParams } from 'react-router';
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
