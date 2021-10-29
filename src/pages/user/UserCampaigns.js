import React, { useState, useEffect } from 'react';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';

import { getCampaignsByUser } from '../../actions/campaign';
import moment from 'moment';
import UserCampaignsList from '../../component/table/UserCampaignsList';

const processDataForTable = (data) =>
  data.map((campaign) => ({
    key: campaign._id,
    title: campaign.title.slice(0, 20) + '...',
    slug: campaign.slug,
    createdBy: campaign.createdBy.name,
    target: Number(campaign.target).toLocaleString(),
    donated: Number(campaign.donatedAmount).toLocaleString(),
    category: campaign.category.name,
    status: campaign.status,
    createdAt: moment(campaign.createdAt).format('DD-MM-YY'),
    from: moment(campaign.from).format('DD-MM-YY'),
    to: moment(campaign.to).format('DD-MM-YY'),
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
