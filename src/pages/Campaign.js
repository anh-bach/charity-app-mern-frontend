import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col, Progress, Button, Avatar } from 'antd';
import { Divider } from 'antd';
import moment from 'moment';
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
import Payment from '../component/payment/Payment';
import { getDonationsByCampaign } from '../actions/donation';
import DonationsList from '../component/table/DonationsList';
import CampaignCard from '../component/card/CampaignCard';
import Join from '../assets/images/join.png';
import CTABanner from '../component/banner/CTABanner';

const { Title, Text } = Typography;

const Campaign = () => {
  const { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const checkoutState = useSelector((state) => state.checkoutState);
  const user = useSelector((state) => state.user);
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
    //If the user not logged in, redirect to login
    if (!user || !user._id) {
      history.push('/login');
    } else {
      try {
        dispatch({ type: TOGGLE_CHECKOUT });
      } catch (error) {
        console.log('from handle click support', error);
      }
    }
  };

  const renderCampaign = (campaign) => (
    <section className='campaign'>
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
      <section>
        <Row className='campaign__top main__section'>
          <Col span={24}>
            <Title className='campaign__top--heading heading--2' level={2}>
              {campaign.title}
            </Title>
          </Col>
        </Row>
      </section>
      <section className='campaign__middle'>
        <Row
          className='campaign__middle--img'
          style={{
            background: `url(${campaign.imageCover.url}) no-repeat fixed center`,
          }}
        >
          <Col className='campaign__middle--card' span={12} offset={6}>
            <Row gutter={[32]} className='campaign__middle--card-area'>
              <Col span={20} className='campaign__middle--card-area-left'>
                <Row className='campaign__middle--card-area-left-top'>
                  <Text className='campaign__middle--card-area-left-top--percent'>
                    {Math.round(
                      (campaign.donatedAmount / campaign.target) * 100
                    )}
                    %
                  </Text>
                  <Progress
                    className='campaign__middle--card-area-left-top--progress'
                    percent={(
                      (campaign.donatedAmount / campaign.target) *
                      100
                    ).toFixed(2)}
                    status='active'
                    showInfo={false}
                  />
                </Row>
                <Row
                  gutter={32}
                  className='campaign__middle--card-area-left-bottom'
                >
                  <Col
                    className='campaign__middle--card-area-left-bottom--data'
                    span={8}
                  >
                    <LineChartOutlined className='campaign__middle--card-area-left-bottom--data-icon' />
                    <span>
                      <span className='campaign__middle--card-area-left-bottom--data-number'>
                        {`$${campaign.donatedAmount.toLocaleString()}`}
                      </span>
                      {`raised of $${campaign.target}`}
                    </span>
                  </Col>
                  <Col
                    className='campaign__middle--card-area-left-bottom--data'
                    span={8}
                  >
                    <UsergroupAddOutlined className='campaign__middle--card-area-left-bottom--data-icon' />
                    <span>
                      <span className='campaign__middle--card-area-left-bottom--data-number'>
                        {donations.length}
                      </span>
                      Supporters
                    </span>
                  </Col>
                  <Col
                    className='campaign__middle--card-area-left-bottom--data'
                    span={8}
                  >
                    <ClockCircleOutlined className='campaign__middle--card-area-left-bottom--data-icon' />
                    <span>
                      {moment(campaign.to).diff(moment()) > 0 ? (
                        <Fragment>
                          <span className='campaign__middle--card-area-left-bottom--data-number'>
                            {moment(campaign.to).diff(moment(), 'days')}
                          </span>
                          <span> days left</span>
                        </Fragment>
                      ) : (
                        <span>Overdued</span>
                      )}
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col span={4} className='campaign__middle--card-area-right'>
                <Button
                  className='btn btn--primary'
                  shape='round'
                  onClick={handleClick}
                  disabled={moment(campaign.to).diff(moment()) < 0}
                >
                  Support
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section>
        <Row gutter={[32]} className='campaign__bottom main__section'>
          <Col span={18} className='campaign__bottom-left'>
            <Row>
              <Col className='campaign__bottom-left-quote'>
                <blockquote>
                  <span>{campaign.slogan}</span>
                </blockquote>
              </Col>
            </Row>
            <Row className='campaign__bottom-left-description'>
              {campaign.description.split(/\r?\n|\r/g).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </Row>
          </Col>
          <Col span={6} className='campaign__bottom-right'>
            <div className='campaign__bottom-right--card campaign__bottom-right--card--org'>
              <Title className='campaign__bottom-right--card--heading'>
                ORGANIZER
              </Title>
              <Row className='campaign__bottom-right--card--user-card user-card'>
                <Col
                  span={6}
                  className='campaign__bottom-right--card--user-card__left user-card__left'
                >
                  {campaign.createdBy.photo ? (
                    <Avatar
                      className='campaign__bottom-right--card--user-card__left--avatar user-card'
                      src={campaign.createdBy.photo.url}
                    />
                  ) : (
                    <Avatar className='campaign__bottom-right--card--user-card__left--avatar user-card'>
                      {campaign.createdBy.name[0]}
                    </Avatar>
                  )}
                </Col>
                <Col
                  span={18}
                  className='campaign__bottom-right--card--user-card__right user-card__right'
                >
                  <h4 className='campaign__bottom-right--card--user-card__right--title user-card__right--title'>
                    {campaign.createdBy.name}
                  </h4>
                  <p className='campaign__bottom-right--card--user-card__right--sub-title user-card__right--sub-title'>
                    {campaign.createdBy.address || 'Address: Anonymous'}
                  </p>
                </Col>
              </Row>
              <Row className='campaign__bottom-right--card--body-text'>
                <Col
                  span={12}
                  className='campaign__bottom-right--card--body-text--left'
                >
                  {totalCampaignsByUser} Campaigns
                </Col>
                <Col
                  span={12}
                  className='campaign__bottom-right--card--body-text--right'
                >
                  {donations.length} Supporters
                </Col>
              </Row>
            </div>
            <div className='campaign__bottom-right--card campaign__bottom-right--card--supporter'>
              <Title className='campaign__bottom-right--card--heading'>
                RECENT SUPPORTERS
              </Title>
              <DonationsList donations={donations} />
            </div>
          </Col>
        </Row>
        <Divider />
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
    </section>
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
