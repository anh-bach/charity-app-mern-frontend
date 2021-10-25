import React, { useState, useEffect } from 'react';
import Layout from 'antd/lib/layout';
import HeroBanner from '../component/banner/HeroBanner';
import Campaigns from '../component/campaigns/Campaigns';
import { getCampaigns } from '../actions/campaign';
import Join from '../assets/images/join.png';
import HowItWorks from '../component/HowItWorks';
import GlobalActivities from '../component/GlobalActivities';
import CTABanner from '../component/banner/CTABanner';

const { Content } = Layout;

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getCampaigns(1, 3);
      setCampaigns(res.data.data.campaigns);
      setLoading(false);
    } catch (error) {
      console.log('From load approved campaigns', error);
      setLoading(false);
    }
  };

  return (
    <Content className='main-area'>
      <HeroBanner />
      {loading ? <p>Loading...</p> : <Campaigns campaigns={campaigns} />}
      <HowItWorks />
      <GlobalActivities />
      <CTABanner
        heading='Be A Part Of Our Proud Community'
        bodyText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et.'
        btnVal='Join Now'
        img={Join}
      />
    </Content>
  );
};

export default Home;
