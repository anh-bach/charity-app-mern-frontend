import React from 'react';
import { useParams } from 'react-router';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const UserCampaign = () => {
  const { slug } = useParams();
  return (
    <section className='ant-space ant-space-vertical main__section all-campaigns'>
      <Row className='all-campaigns__top main__section--header'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  all-campaigns__top--text'>
          <Title
            className='all-campaigns__top--text--heading heading--2'
            level={2}
          >
            {slug}
          </Title>
        </Col>
      </Row>
      <Row gutter={[32, 32]} className='all-campaigns__middle'></Row>
    </section>
  );
};

export default UserCampaign;
