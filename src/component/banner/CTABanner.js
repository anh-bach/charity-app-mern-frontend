import React from 'react';
import { Card, Typography, Button, Row, Col } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CTABanner = ({ heading, bodyText, btnVal, img }) => {
    return (
        <section className="cta-banner">
            <div className="main__section cta-banner__area">
                <Card className="cta-banner__area-card" bordered={false}>
                    <Row className="cta-banner__area-card__body">
                        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 cta-banner__area-card__body--left">
                            <Title className="cta-banner__area-card__body--left--heading" level={2}>{heading}</Title>
                            <Text className="cta-banner__area-card__body--left--sub-heading">{bodyText}</Text>
                            <Button className="cta-banner__area-card__body--left--btn btn--text" type="link" block>{btnVal} <RightCircleOutlined /></Button>
                        </Col>
                        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 cta-banner__area-card__body--right">
                            <img className="cta-banner__area-card__body--right--img" src={img} alt='join now' />
                        </Col>
                    </Row>
                </Card>
            </div>
        </section>
    );
};

export default CTABanner;