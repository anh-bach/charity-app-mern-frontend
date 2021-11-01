import React, { useState, useEffect } from 'react';
import { getCampaignsByUser } from '../../actions/campaign';
import UserDashboardOverviewChart from '../../component/chart/UserDashboardOverviewChart';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const UserDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await getCampaignsByUser();
      setCampaigns(res.data.data);
    } catch (error) {
      console.log('From User Dashboard overview', error);
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='Dashboard Overview' />
      <UserDashboardOverviewChart campaigns={campaigns} />
    </div>
  );
};

export default UserDashboard;
