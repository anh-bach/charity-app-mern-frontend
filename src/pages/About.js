import React from 'react';
import TeamCard from '../component/card/TeamCard';
import Jar from '../assets/images/starry_jar.jpg';
import Khan from '../assets/images/KhanUXD.jpg';
import StarryNight from '../assets/images/starry_night.jpg';

import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const About = () => {
  return (
    <section className='ant-space ant-space-vertical main__section team'>
      <Row className='team__top main__section--header'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  team__top--content'>
          <Title className='team__top--content--heading heading--2' level={2}>
            Our Teams
          </Title>
          <Text className='team__top--content--sub-heading sub-heading'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur
            sit amet eros blandit, hendrerit elit et, mattis purus.
          </Text>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className='team-ui'>
        <Col className='ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 team-ui-col'>
          <TeamCard
            image={Khan}
            name='Khan Fayjul'
            title='Front-End UX Developer'
            portfolioURL='https://khanuxd.com/'
            gitHubURL='https://github.com/khanuxd'
            linkedinURL='https://www.linkedin.com/in/fayejkhan/'
            email='khanuxd@gmail.com'
          />
        </Col>
        <Col className='ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 team-ui-col'>
          <TeamCard
            image={StarryNight}
            name='Anh Bach'
            title='Full-Stack Developer'
            portfolioURL='#'
            gitHubURL='https://github.com/iamanh1990'
            linkedinURL='https://www.linkedin.com/in/iamanh/'
            email='#'
          />
        </Col>
        <Col className='ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 team-ui-col'>
          <TeamCard
            image={Jar}
            name='Rahman'
            title='Front-End Developer'
            portfolioURL='#'
            gitHubURL='https://github.com/'
            linkedinURL='https://www.linkedin.com/'
            email='#'
          />
        </Col>
      </Row>
    </section>
  );
};

export default About;
