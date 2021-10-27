import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col, Progress, Button, Avatar } from 'antd';

import {
  ClockCircleOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { getCampaign } from '../actions/campaign';
import { TOGGLE_CHECKOUT } from '../actions/types';

const { Title, Text } = Typography;

const Campaign = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const res = await getCampaign(slug);
      setCampaign(res.data.data.campaign);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From loading single campaign by user', error);
    }
  };

  const handleClick = async () => {
    try {
      dispatch({ type: TOGGLE_CHECKOUT });
    } catch (error) {
      console.log('from handle click support', error);
    }
  };

  const renderCampaign = (campaign) => (
    <section className="campaign">
      <Row className="campaign__top main__section">
        <Col span={24}>
          <Title
            className='campaign__top--heading heading--2'
          >
            {campaign.title}
          </Title>
        </Col>
      </Row>
      <section className="campaign__middle">
        <Row className="campaign__middle--img"
          style={{
            background: `url(${campaign.imageCover.url}) no-repeat fixed center`,
          }}
        >
          <Col
            className="campaign__middle--card"
            span={12}
            offset={6}
          >
            <Row gutter={[32]} className="campaign__middle--card-area">
              <Col span={20} className="campaign__middle--card-area-left">
                <Row className='campaign__middle--card-area-left-top'>
                  <Text className='campaign__middle--card-area-left-top--percent'>
                    {(campaign.donatedAmount / campaign.target) * 100}%
                  </Text>
                  <Progress className='campaign__middle--card-area-left-top--progress' percent={(campaign.donatedAmount / campaign.target) * 100} status='active' showInfo={false} />
                </Row>
                <Row gutter={[32]} className="campaign__middle--card-area-left-bottom">
                  <Col className="campaign__middle--card-area-left-bottom--data" span={8}>
                    <LineChartOutlined className="campaign__middle--card-area-left-bottom--data-icon" />
                    <span>
                      <span className="campaign__middle--card-area-left-bottom--data-number">
                        {campaign.donatedAmount}
                      </span>
                      {`raised of $${campaign.target}`}
                    </span>
                  </Col>
                  <Col className="campaign__middle--card-area-left-bottom--data" span={8}>
                    <UsergroupAddOutlined className="campaign__middle--card-area-left-bottom--data-icon" />
                    <span>
                      <span className="campaign__middle--card-area-left-bottom--data-number">20</span>
                      Supporters
                    </span>
                  </Col>
                  <Col className="campaign__middle--card-area-left-bottom--data" span={8}>
                    <ClockCircleOutlined className="campaign__middle--card-area-left-bottom--data-icon" />
                    <span>
                      <span className="campaign__middle--card-area-left-bottom--data-number">
                        20
                      </span>
                      Days left
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col span={4} className="campaign__middle--card-area-right">
                <Button
                  shape='round'
                  className="btn btn--primary"
                  onClick={handleClick}
                >
                  Support
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <Row gutter={[32]} className="campaign__bottom main__section">
        <Col span={18} className="campaign__bottom-left">
          <Row>
            <Col className="campaign__bottom-left-quote">
              <blockquote>
                <span>
                  {campaign.slogan}
                </span>
              </blockquote>
            </Col>
          </Row>
          <Row
            className='campaign__bottom-left-description'>
            {campaign.description.split(/\r?\n|\r/g).map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </Row>
        </Col>
        <Col span={6} className="campaign__bottom-right">
          <div className="campaign__bottom-right--card campaign__bottom-right--card-org">
            <Title className="campaign__bottom-right--card-heading">ORGANIZER</Title>
            <Row>
              <Col span={4}>
                {campaign.createdBy.photo ? (
                  <Avatar src={campaign.createdBy.photo.url} />
                ) : (
                  <Avatar>{campaign.createdBy.name[0]}</Avatar>
                )}
              </Col>
              <Col span={20}>
                <h4>{campaign.createdBy.name}</h4>
                <p>{campaign.createdBy.address || 'Address: Anonymous'}</p>
              </Col>
            </Row>
            <Row>
              {`3 Campaigns | 5 Supporters`}
            </Row>
          </div>
          <div className="campaign__bottom-right--card campaign__bottom-right--card-supporter">
            <Title className="campaign__bottom-right--card-heading">RECENT SUPPORTERS</Title>
            <Row>Anonymous</Row>
          </div>
        </Col>
      </Row>
    </section >
  );

  return loading ? (
    <section className='ant-space ant-space-vertical main__section all-campaigns'>
      <Row className='all-campaigns__top main__section--header'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  all-campaigns__top--text'>
          <Title
            className='all-campaigns__top--text--heading heading--2'
            level={2}
          >
            Loading...
          </Title>
        </Col>
      </Row>
    </section>
  ) : (
    campaign && renderCampaign(campaign)
  );
};

export default Campaign;
