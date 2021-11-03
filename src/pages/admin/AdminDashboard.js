import React, { Fragment, useState, useEffect } from 'react';
import {
  getCampaignsByAdmin,
  getCampaignsByDayForAdmin,
} from '../../actions/campaign';
import { getDonationsByDayForAdmin } from '../../actions/donation';
import AdminDashboardOverviewChart from '../../component/chart/AdminDashboardOverviewChart';
import AdminDashboardOverviewLineChart from '../../component/chart/AdminDashboardOverviewLineChart';

import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const AdminDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsByDay, setCampaignsByDay] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadCampaigns();
    loadDonationsByDay();
    loadCampaignsByDay();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await getCampaignsByAdmin();
      setCampaigns(res.data.data.campaigns);
    } catch (error) {
      console.log('From admin dashboard overview', error);
    }
  };

  const loadDonationsByDay = async () => {
    try {
      const res = await getDonationsByDayForAdmin();
      setDonations(res.data.data);
    } catch (error) {
      console.log('From loading donations by day', error);
    }
  };

  const loadCampaignsByDay = async () => {
    try {
      const res = await getCampaignsByDayForAdmin();
      setCampaignsByDay(res.data.data);
    } catch (error) {
      console.log('From loading campaigns by day', error);
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='Dashboard Overview' />
      <AdminDashboardOverviewLineChart
        donations={donations}
        campaignsByDay={campaignsByDay}
      />
    </div>
  );
};

export default AdminDashboard;
