import React from 'react';
import TeamCard from '../component/card/TeamCard';
import HoldLove from '../assets/images/holdlove.jpg';
import Khan from '../assets/images/KhanUXD.jpg';

import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const About = () => {
  return (
    <section className="ant-space ant-space-vertical main__section team">
      <Row className="team__top main__section--header">
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  team__top--content">
          <Title className="team__top--content--heading heading--2" level={2}>Our Teams</Title>
          <Text className="team__top--content--sub-heading sub-heading">Get to know about our amazing team members</Text>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className="team-ui">
        <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 team-ui-col">
          <TeamCard image={Khan} name="Khan Fayjul" title="Front-End UX Developer" portfolioURL="https://khanuxd.com/" gitHubURL="https://github.com/khanuxd" linkedinURL="https://www.linkedin.com/in/fayejkhan/" email="khanuxd@gmail.com" />
        </Col>
        <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 team-ui-col">
          <TeamCard image={HoldLove} name="Bach Anh" title="Full-Stack Developer" portfolioURL="#" gitHubURL="https://github.com/" linkedinURL="https://www.linkedin.com/" email="#" />
        </Col>
        <Col className="ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 team-ui-col">
          <TeamCard image={HoldLove} name="Bach Anh" title="Full-Stack Developer" portfolioURL="#" gitHubURL="https://github.com/" linkedinURL="https://www.linkedin.com/" email="#" />
        </Col>
      </Row>
    </section>
  );
};

export default About;