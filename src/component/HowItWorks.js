import React from 'react';
import FeatureCard from './card/FeatureCard';
import { Typography, Row, Col } from 'antd';
import { NotificationOutlined, SafetyCertificateOutlined, EuroOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;

const HowItWorks = () => {
    return (
        <section className="ant-space ant-space-vertical how-it-works">
            <div className="main__section how-it-works__area">
                <Row className="how-it-works__area--top main__section--header">
                    <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  how-it-works__area--top-text">
                        <Title className="how-it-works__area--top-text--heading heading--2" level={2}>How It Works</Title>
                        <Text className="how-it-works__area--top-text--sub-heading sub-heading">3 is just a number. It's even quicker than your imagination.</Text>
                    </Col>
                </Row>
                <Row gutter={[32, 32]} className="how-it-works__area--bottom">
                    <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 how-it-works__area--bottom--col">
                        <FeatureCard keyVal={<NotificationOutlined />} heading="01. Start Campaign" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, " />
                    </Col>
                    <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 how-it-works__area--bottom--col">
                        <FeatureCard keyVal={<SafetyCertificateOutlined />} heading="02 . Get Approval" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, " />
                    </Col>
                    <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 how-it-works__area--bottom--col">
                        <FeatureCard keyVal={<EuroOutlined />} heading="03 . Get Your Funds" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, " />
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default HowItWorks;