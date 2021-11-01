import React, { Fragment, useState, useEffect } from 'react';
import { getCampaignsByAdmin } from '../../actions/campaign';
import AdminDashboardOverviewChart from '../../component/chart/AdminDashboardOverviewChart';

import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await getCampaignsByAdmin();
      setCampaigns(res.data.data.campaigns);
    } catch (error) {
      console.log('From admin dashboard overview', error);
    }
  };

  return (
    <Fragment>
      <DashboardHorizontalNav title='Dashboard Overview' />
      <AdminDashboardOverviewChart campaigns={campaigns} />
    </Fragment>
  );
};

export default AdminDashboard;
