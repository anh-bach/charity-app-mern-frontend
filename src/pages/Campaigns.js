import React, { useState, useEffect } from 'react';
import CampaignCard from '../component/card/CampaignCard';

import { Typography, Row, Col, Button } from 'antd';
import { getActiveCampaignsTotal, getCampaigns } from '../actions/campaign';

const { Title } = Typography;

const Campaigns = () => {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaignsTotal, setActiveCampaignsTotal] = useState(0);

  useEffect(() => {
    loadCampaigns();
    loadActiveCampaignsTotal();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getCampaigns(1, 15);
      setCampaigns(res.data.data.campaigns);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From load all campaigns', error);
    }
  };

  const loadActiveCampaignsTotal = async () => {
    try {
      setLoading(true);
      const res = await getActiveCampaignsTotal();
      setActiveCampaignsTotal(res.data.data.activeCampaignsTotal);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('from load active campaigns total', error);
    }
  };

  return (
    <section className='ant-space ant-space-vertical main__section all-campaigns'>
      <Row className='all-campaigns__top main__section--header'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  all-campaigns__top--text'>
          <Title
            className='all-campaigns__top--text--heading heading--2'
            level={2}
          >
            {activeCampaignsTotal} Active Campaigns
          </Title>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className='all-campaigns__middle'>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </Row>
      <Row className='all-campaigns__bottom'>
        <Col span={24} className='all-campaigns__bottom--btn'>
          <Button className='btn btn--primary' type='primary' shape='round'>
            Browse More Campaigns
          </Button>
        </Col>
      </Row>
    </section>
  );
};

export default Campaigns;
