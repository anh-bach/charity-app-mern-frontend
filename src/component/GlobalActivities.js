import React from 'react';
import FeatureCard from './card/FeatureCard';
import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const GlobalActivities = () => {
    return (
        <section className="ant-space ant-space-vertical global-activities">
            <div className="main__section global-activities__area">
                <Row className="global-activities__area--top main__section--header">
                    <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  global-activities__area--top-text">
                        <Title className="global-activities__area--top-text--heading heading--2" level={2}>Our Global Activities</Title>
                        <Text className="global-activities__area--top-text--sub-heading sub-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur sit amet eros blandit, hendrerit elit et, mattis purus.</Text>
                    </Col>
                </Row>
                <Row gutter={[32, 32]} className="global-activities__area--bottom">
                    <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 global-activities__area--bottom--col">
                        <FeatureCard keyVal="10K" heading="Worldwide Campaigns" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, " />
                    </Col>
                    <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 global-activities__area--bottom--col">
                        <FeatureCard keyVal="$600M" heading="Fund Raised" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, " />
                    </Col>
                    <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 global-activities__area--bottom--col">
                        <FeatureCard keyVal="200M" heading="Worldwide Doners" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, " />
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default GlobalActivities;