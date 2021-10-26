import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import { Typography, Row, Col, Progress, Button, Avatar } from 'antd';
import { getCampaignByUser } from '../../actions/campaign';
import {
  ClockCircleOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const UserCampaign = () => {
  const { slug } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const res = await getCampaignByUser(slug);
      setCampaign(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From loading single campaign by user', error);
    }
  };

  const renderCampaign = (campaign) => (
    <Fragment>
      <section className='ant-space ant-space-vertical main__section all-campaigns'>
        <Row className='all-campaigns__top main__section--header'>
          <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  all-campaigns__top--text'>
            <Title
              className='all-campaigns__top--text--heading heading--2'
              level={2}
            >
              {campaign.title}
            </Title>
          </Col>
        </Row>
      </section>
      <section>
        <Row
          style={{
            background: `url(${campaign.imageCover.url}) no-repeat fixed center`,
            backgroundSize: 'cover',
            height: '500px',
            position: 'relative',
          }}
        >
          <Col
            span={12}
            offset={6}
            style={{
              padding: '4rem 3rem',
              background: '#fff',
              position: 'absolute',
              bottom: '0',
              transform: 'translateY(50%)',
              width: '100%',
              borderRadius: '3px',
            }}
          >
            <Row>
              <Col span={20}>
                <Progress percent={0} status='active' />
                <Row gutter={16}>
                  <Col>
                    <LineChartOutlined />$ 0 Amount raised
                  </Col>
                  <Col>
                    <UsergroupAddOutlined /> 0 Supporters
                  </Col>
                  <Col>
                    <ClockCircleOutlined />{' '}
                    {moment(campaign.to).diff(moment(), 'days')} Days left
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Button
                  style={{ margin: 'auto', display: 'block' }}
                  type='primary'
                  shape='round'
                >
                  Support
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className='ant-space ant-space-vertical main__section all-campaigns'>
        <Row>
          <Col span={16}>
            <blockquote style={{ position: 'relative' }}>
              <span
                style={{
                  fontSize: '5rem',
                  position: 'absolute',
                  transform: 'translateY(-50%)',
                }}
              >
                &#8220;
              </span>{' '}
              <span style={{ fontSize: '2rem', fontWeight: '500' }}>
                {campaign.slogan}
              </span>
            </blockquote>
            <div
              className='campaign__description'
              style={{ whiteSpace: 'pre-line' }}
            >
              {campaign.description.split(/\r?\n|\r/g).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </Col>
          <Col span={6} offset={2}>
            <h3>ORGANIZER</h3>
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
                <p>{campaign.createdBy.address || 'Address: Unknown'}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </Fragment>
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

export default UserCampaign;
