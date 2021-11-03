import React, { useState, useEffect } from 'react';
import { getCampaignsByUser } from '../../actions/campaign';
import { getDonationsToUser } from '../../actions/donation';
import UserDashboardOverviewBanner from '../../component/banner/UserDashboardOverviewBanner';
import UserDashboardOverviewChart from '../../component/chart/UserDashboardOverviewChart';
import UserDashboardOverviewLineChart from '../../component/chart/UserDashboardOverviewLineChart';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const UserDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadCampaigns();
    loadDonations();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await getCampaignsByUser();
      setCampaigns(res.data.data);
    } catch (error) {
      console.log('From User Dashboard overview', error);
    }
  };

  const loadDonations = async () => {
    try {
      const res = await getDonationsToUser();
      setDonations(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log('From User Dashboard overview load donations', error);
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='Dashboard Overview' />
      <UserDashboardOverviewBanner
        campaigns={campaigns}
        donations={donations}
      />
      <UserDashboardOverviewChart campaigns={campaigns} />
      <UserDashboardOverviewLineChart donations={donations} />
    </div>
  );
};

export default UserDashboard;
