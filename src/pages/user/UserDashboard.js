import React, { useState, useEffect } from 'react';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardHorizontalNav title='Dashboard Overview' />
    </div>
  );
};

export default UserDashboard;
