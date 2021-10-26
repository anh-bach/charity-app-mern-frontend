import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col, Progress, Button, Avatar } from 'antd';

import {
  ClockCircleOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  getActiveCampaignsTotalByUser,
  getCampaign,
  getCampaigns,
} from '../actions/campaign';
import { TOGGLE_CHECKOUT } from '../actions/types';
import moment from 'moment';
import Payment from '../component/payment/Payment';
import { getDonationsByCampaign } from '../actions/donation';
import DonationsList from '../component/table/DonationsList';
import CampaignCard from '../component/card/CampaignCard';
import Join from '../assets/images/join.png';
import CTABanner from '../component/banner/CTABanner';

const { Title } = Typography;

const Campaign = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const checkoutState = useSelector((state) => state.checkoutState);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [totalCampaignsByUser, setTotalCampaignsByUser] = useState(0);
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadCampaign();
      loadDonations();
    }
    return () => {
      isMounted = false; //cleanup
    };
  }, [slug]);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const res = await getCampaign(slug);
      setCampaign(res.data.data.campaign);
      await loadActiveCampaignsTotalByUser(
        res.data.data.campaign.createdBy._id
      );
      await loadRelatedCampaigns(res.data.data.campaign);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From loading single campaign by user', error);
    }
  };

  const loadDonations = async () => {
    try {
      setLoading(true);
      const res = await getDonationsByCampaign(slug);
      setDonations(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log('From loading donation', error);
      setLoading(false);
    }
  };

  const loadActiveCampaignsTotalByUser = async (userId) => {
    try {
      const res = await getActiveCampaignsTotalByUser(userId);
      setTotalCampaignsByUser(res.data.data.activeCampaignsTotalByUser);
    } catch (error) {
      console.log('From load active campaigns total by user', error);
    }
  };

  const loadRelatedCampaigns = async (campaign) => {
    try {
      const category = campaign.category._id;
      const res = await getCampaigns(1, 3, category);
      const filteredCampaigns = res.data.data.campaigns.filter(
        (item) => item._id !== campaign._id
      );
      setRelatedCampaigns(filteredCampaigns);
    } catch (error) {
      console.log('From load related campaigns');
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
    <Fragment>
      {checkoutState && (
        <Payment
          slug={slug}
          loading={loading}
          setLoading={setLoading}
          dispatch={dispatch}
          loadCampaign={loadCampaign}
          loadDonations={loadDonations}
        />
      )}
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
                <Progress
                  percent={(campaign.donatedAmount / campaign.target) * 100}
                  status='active'
                />
                <Row gutter={16}>
                  <Col>
                    <LineChartOutlined />$
                    {campaign.donatedAmount.toLocaleString()} Amount raised
                  </Col>
                  <Col>
                    <UsergroupAddOutlined /> {donations.length} Supporters
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
                  onClick={handleClick}
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
            <Row>
              <span
                style={{
                  paddingRight: '1rem',
                  borderRight: '1px solid black',
                }}
              >
                {totalCampaignsByUser} Campaigns
              </span>
              <span
                style={{
                  paddingLeft: '1rem',
                }}
              >
                {donations.length} Supporters
              </span>
            </Row>
            <h3>RECENT SUPPORTERS</h3>
            <DonationsList donations={donations} />
          </Col>
        </Row>
      </section>

      {relatedCampaigns.length > 0 && (
        <section className='ant-space ant-space-vertical main__section latest-campaigns'>
          <Row className='latest-campaigns__top main__section--header'>
            <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 ant-col-xxl-12  latest-campaigns__top--text'>
              <Title
                className='latest-campaigns__top--text--heading heading--2'
                level={2}
              >
                You Might Also Be Interested
              </Title>
            </Col>
          </Row>
          <Row gutter={[32, 32]} className='latest-campaigns__middle'>
            {relatedCampaigns.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </Row>
        </section>
      )}
      <CTABanner
        heading='Have Any Campaigns To Start?'
        bodyText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et.'
        btnVal='Start A Campaign'
        img={Join}
      />
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

export default Campaign;
