import React from 'react';
import CampaignCard from './card/CampaignCard';
import { Link } from 'react-router-dom';

import HoldLove from '../assets/images/holdlove.jpg';
import ShareLove from '../assets/images/sharelove.jpg';
import HoldHand from '../assets/images/holdhand.jpg';

import { Typography, Button, Row, Col } from 'antd';

const { Title, Text } = Typography;

const Campaign = () => {
    return (
        <section className="ant-space ant-space-vertical main__section latest-campaigns">
            <Row className="latest-campaigns__top main__section--header">
                <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  latest-campaigns__top--text">
                    <Title className="latest-campaigns__top--text--heading heading--2" level={2}>Latest Campaigns</Title>
                    <Text className="latest-campaigns__top--text--sub-heading sub-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur sit amet eros blandit, hendrerit elit et, mattis purus.</Text>
                </Col>
            </Row>
            <Row gutter={[32, 32]} className="latest-campaigns__middle">
                <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 latest-campaigns__middle--col">
                    <CampaignCard image={HoldLove} heading="Lorem dolor consectetur adipiscing elit" progressPerc="50" raisedFund={300} targetFund={1000} daysLeft={20} />
                </Col>
                <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 latest-campaigns__middle--col">
                    <CampaignCard image={ShareLove} heading="Dolor consectetur adipiscing elit" progressPerc="95" raisedFund={700} targetFund={10000} daysLeft={30} />
                </Col>
                <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 latest-campaigns__middle--col">
                    <CampaignCard image={HoldHand} heading="Cpsum consectetur adipiscing elit" progressPerc="90" raisedFund={900} targetFund={5000} daysLeft={10} />
                </Col>
            </Row>
            <Row className="latest-campaigns__bottom">
                <Col span={24} className="latest-campaigns__bottom--btn">
                    <Link to='/campaigns'>
                        <Button className="btn btn--primary" type="primary" shape="round">
                            Browse Campaigns
                        </Button>
                    </Link>
                </Col>
            </Row>
        </section>
    );
};

export default Campaign;