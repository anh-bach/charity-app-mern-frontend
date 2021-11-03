import React from 'react';
import { Row, Col } from 'antd';
import { DollarCircleFilled } from '@ant-design/icons';

const UserDashboardOverviewBanner = ({ campaigns, donations }) => {
  const activeCampaignsTotal = campaigns.filter(
    (campaign) => campaign.status === 'approved'
  ).length;

  const raisedFundTotal = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  const supportersTotal = [
    ...new Set(donations.map((donation) => donation.donatedBy)),
  ].length;

  const BannerItem = ({ icon, number, title }) => (
    <Row>
      <Col>{icon}</Col>
      <Col offset={2}>
        <div>{number}</div>
        <div>{title}</div>
      </Col>
    </Row>
  );

  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem',
      }}
    >
      <Col
        span={6}
        style={{
          backgroundColor: '#dceaf5',
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        <BannerItem
          icon={<DollarCircleFilled />}
          number={activeCampaignsTotal}
          title='Active Campaigns'
        />
      </Col>
      <Col
        span={6}
        style={{
          backgroundColor: '#dceaf5',
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        <BannerItem
          icon={<DollarCircleFilled />}
          number={raisedFundTotal.toLocaleString()}
          title='Raised Funds'
        />
      </Col>
      <Col
        span={6}
        style={{
          backgroundColor: '#dceaf5',
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        <BannerItem
          icon={<DollarCircleFilled />}
          number={supportersTotal}
          title='Active Supporters'
        />
      </Col>
    </Row>
  );
};

export default UserDashboardOverviewBanner;
