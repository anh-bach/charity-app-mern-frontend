import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import love from '../../assets/images/love.png';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const HeroBanner = () => {
  return (
    <section className='hero' id='hero'>
      <Row className='hero__content'>
        <Col
          className='hero__content__left ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12'
        >
          <Title className='hero__content__left--title heading--1'>
            <span className='hero__content__left--title-span'>Your 1st step</span> matters for a better <span>Tomorrow</span>
          </Title>
          <Button
            className='hero__content__left--button btn btn--primary'
            type='primary'
            shape='round'
          >
            <Link to='/me/dashboard/start-campaign'>Start Your Campaign</Link>
          </Button>
        </Col>
        <Col
          className='hero__content__right ant-col-lg-12 ant-col-xl-12'
        >
          <div className='hero__content__right--circle'>
            <img
              className='hero__content__right--img'
              src={love}
              alt='share love'
              width={'100%'}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HeroBanner;
