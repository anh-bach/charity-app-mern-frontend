import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  getCampaignsByAdmin,
  updateCampaignByAdmin,
} from '../../actions/campaign';
import AdminCampaignsList from '../../component/table/AdminCampaignsList';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import { toast } from 'react-toastify';

const processDataForTable = (data) =>
  data.map((campaign) => ({
    key: campaign._id,
    slug: campaign.slug,
    title: campaign.title,
    createdBy: campaign.createdBy.name,
    target: Number(campaign.target).toLocaleString(),
    category: campaign.category.name,
    status: campaign.status,
    createdAt: moment(campaign.createdAt).format('DD-MM-YYYY'),
  }));

const AdminCampaigns = () => {
  const [loading, setLoading] = useState(false);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [rejectedCampaigns, setRejectedCampaigns] = useState([]);

  useEffect(() => {
    loadPendingCampaigns();
    loadApprovedCampaigns();
    loadRejectedCampaigns();
  }, []);

  const loadPendingCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getCampaignsByAdmin('pending');
      const tableData = processDataForTable(res.data.data.campaigns);
      setPendingCampaigns(tableData);
      setLoading(false);
    } catch (error) {
      console.log('from load pending campaigns', error);
    }
  };

  const loadApprovedCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getCampaignsByAdmin('approved');
      const tableData = processDataForTable(res.data.data.campaigns);
      setApprovedCampaigns(tableData);
      setLoading(false);
    } catch (error) {
      console.log('from load approved campaigns', error);
    }
  };

  const loadRejectedCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getCampaignsByAdmin('rejected');
      const tableData = processDataForTable(res.data.data.campaigns);
      setRejectedCampaigns(tableData);
      setLoading(false);
    } catch (error) {
      console.log('from load rejected campaigns', error);
    }
  };

  const handleActionClick = async (campaignId, updates) => {
    try {
      setLoading(true);
      const res = await updateCampaignByAdmin(campaignId, updates);
      toast.success(res.data.message);
      loadPendingCampaigns();
      loadRejectedCampaigns();
      loadApprovedCampaigns();
      setLoading(false);
    } catch (error) {
      console.log('From handle action click', error);
      toast.error('Something went wrong. Please try again later!');
      setLoading(false);
    }
  };

  return (
    <div className='container admin-campaigns'>
      <DashboardHorizontalNav title='All Campaign List' />
      <h3>Pending Campaigns</h3>
      <AdminCampaignsList
        campaigns={pendingCampaigns}
        handleActionClick={handleActionClick}
      />
      <h3>Approved Campaigns</h3>
      <AdminCampaignsList
        campaigns={approvedCampaigns}
        handleActionClick={handleActionClick}
      />
      <h3>Rejected Campaigns</h3>
      <AdminCampaignsList
        campaigns={rejectedCampaigns}
        handleActionClick={handleActionClick}
      />
    </div>
  );
};

export default AdminCampaigns;
