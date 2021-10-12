import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import love from '../../assets/images/love.png';

const { Title } = Typography;

const HeroBanner = () => {
    return (
        <section className="hero">
            <Row className="hero__content">
                <Col span={12} className="hero__content__left ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12">
                    <Title className="hero__content__left--title heading--1">Lorem ipsum dolor sit uerpsum dolor tis.</Title>
                    <Button className="hero__content__left--button btn btn--primary" type="primary" shape="round">
                        Start Your Campaign
                    </Button>
                </Col>
                <Col span={12} className="hero__content__right ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12">
                    <div className="hero__content__right--circle">
                        <img className="hero__content__right--circle--img" src={love} alt='share love' width={'100%'} />
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default HeroBanner;

// ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8