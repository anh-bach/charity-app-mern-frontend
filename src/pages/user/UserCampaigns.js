import React, { useState, useEffect } from 'react';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';

import { getCampaignsByUser } from '../../actions/campaign';
import moment from 'moment';
import UserCampaignsList from '../../component/table/UserCampaignsList';

const processDataForTable = (data) =>
  data.map((campaign) => ({
    key: campaign._id,
    title: campaign.title,
    slug: campaign.slug,
    createdBy: campaign.createdBy.name,
    target: Number(campaign.target).toLocaleString(),
    category: campaign.category.name,
    status: campaign.status,
    createdAt: moment(campaign.createdAt).format('DD-MM-YYYY'),
    from: moment(campaign.from).format('DD-MM-YYYY'),
    to: moment(campaign.to).format('DD-MM-YYYY'),
  }));

const UserCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getCampaignsByUser();
      const tableData = processDataForTable(res.data.data);
      setCampaigns(tableData);
      setLoading(false);
    } catch (error) {
      console.log('from load user campaigns');
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='My Campaigns' />
      <UserCampaignsList campaigns={campaigns} />
    </div>
  );
};

export default UserCampaigns;
