import React from 'react';
import CampaignCard from '../component/card/CampaignCard';
import HoldLove from '../assets/images/holdlove.jpg';
import HoldHand from '../assets/images/holdhand.jpg';
import ShareLove from '../assets/images/sharelove.jpg';


import { Typography, Row, Col, Button } from 'antd';

const { Title } = Typography;

const Campaigns = () => {
  return <section className="ant-space ant-space-vertical main__section all-campaigns">
    <Row className="all-campaigns__top main__section--header">
      <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  all-campaigns__top--text">
        <Title className="all-campaigns__top--text--heading heading--2" level={2}>100 Active Campaigns</Title>
      </Col>
    </Row>
    <Row gutter={[32, 32]} className="all-campaigns__middle">
      <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 all-campaigns__middle--col">
        <CampaignCard image={HoldLove} heading="Lorem dolor consectetur adipiscing elit" progressPerc="50" raisedFund={300} targetFund={1000} daysLeft={20} />
      </Col>
      <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 all-campaigns__middle--col">
        <CampaignCard image={ShareLove} heading="Dolor consectetur adipiscing elit" progressPerc="95" raisedFund={700} targetFund={10000} daysLeft={30} />
      </Col>
      <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 all-campaigns__middle--col">
        <CampaignCard image={HoldHand} heading="Cpsum consectetur adipiscing elit" progressPerc="90" raisedFund={900} targetFund={5000} daysLeft={10} />
      </Col>
      <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 all-campaigns__middle--col">
        <CampaignCard image={HoldLove} heading="Lorem dolor consectetur adipiscing elit" progressPerc="50" raisedFund={300} targetFund={1000} daysLeft={20} />
      </Col>
      <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 all-campaigns__middle--col">
        <CampaignCard image={ShareLove} heading="Dolor consectetur adipiscing elit" progressPerc="95" raisedFund={700} targetFund={10000} daysLeft={30} />
      </Col>
      <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 all-campaigns__middle--col">
        <CampaignCard image={HoldHand} heading="Cpsum consectetur adipiscing elit" progressPerc="90" raisedFund={900} targetFund={5000} daysLeft={10} />
      </Col>
    </Row>
    <Row className="all-campaigns__bottom">
      <Col span={24} className="all-campaigns__bottom--btn">
        <Button className="btn btn--primary" type="primary" shape="round">
          Browse More Campaigns
        </Button>
      </Col>
    </Row>
  </section>;
};

export default Campaigns;