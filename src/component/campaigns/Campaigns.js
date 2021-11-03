import React from 'react';
import CampaignCard from '../card/CampaignCard';

import { Typography, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Campaigns = ({ campaigns = [] }) => {
  return (
    <section className='ant-space ant-space-vertical main__section latest-campaigns'>
      <Row className='latest-campaigns__top main__section--header'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  latest-campaigns__top--text'>
          <Title
            className='latest-campaigns__top--text--heading heading--2'
            level={2}
          >
            Latest Campaigns
          </Title>
          <Text className='latest-campaigns__top--text--sub-heading sub-heading'>
            Check out our latest worldwide campaigns to spread your love for others.
          </Text>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className='latest-campaigns__middle'>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </Row>
      <Row className='latest-campaigns__bottom'>
        <Col span={24} className='latest-campaigns__bottom--btn'>
          <Button className='btn btn--secondary-two' shape='round'>
            {/* <Button className='btn btn--primary' type='primary' shape='round'> */}
            <Link to='/campaigns'>Browse All Campaigns</Link>
          </Button>
        </Col>
      </Row>
    </section>
  );
};

export default Campaigns;
