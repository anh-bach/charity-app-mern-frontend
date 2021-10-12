import React from 'react';
import Layout from 'antd/lib/layout';
import HeroBanner from '../component/banner/HeroBanner';
import Campaign from '../component/Campaign';
import Join from '../assets/images/join.png';
import HowItWorks from '../component/HowItWorks';
import GlobalActivities from '../component/GlobalActivities';
import CTABanner from '../component/banner/CTABanner';

const { Content } = Layout;

const Home = () => {
  return (
    <Content className="main-area">
      <HeroBanner />
      <Campaign />
      <HowItWorks />
      <GlobalActivities />
      <CTABanner heading="Be A Part Of Our Proud Community" bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et." btnVal="Join Now" img={Join} />
    </Content>
  );
};

export default Home;
