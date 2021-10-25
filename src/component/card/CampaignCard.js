import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Button, Card, Progress, Col } from 'antd';
import { HeartOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CampaignCard = ({ campaign = {} }) => {
  const { imageCover, title, donatedAmount, target, daysLeft, slug } = campaign;

  return (
    <Col className='ant-col-xs-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 latest-campaigns__middle--col'>
      <Card className='campaign-card' bodyStyle={{ padding: '0' }}>
        <div className='campaign-card__area'>
          <div className='campaign-card__area-header'>
            <img
              className='campaign-card__area-header--img'
              src={imageCover.url}
              alt={title}
            />
          </div>
          <div className='campaign-card__area-body'>
            <div className='campaign-card__area-body--icon'>
              <div className='campaign-card__area-body--icon-svg'>
                <HeartOutlined />
              </div>
            </div>
            <Title
              level={3}
              className='campaign-card__area-body--heading heading--3'
            >
              {title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </Title>
            {/* <Title level={3} className="campaign-card__area-body--heading heading--3"><Link to='/campaigns'>{heading}</Link></Title> */}
            <div className='campaign-card__area-body--content'>
              <div className='campaign-card__area-body--content--progress'>
                <Text className='campaign-card__area-body--content--progress-percent'>
                  {(donatedAmount / target) * 100}%
                </Text>
                <Progress
                  className='campaign-card__area-body--content--progress-bar'
                  percent={(donatedAmount / target) * 100}
                  showInfo={false}
                />
              </div>

              <div className='campaign-card__area-body--content--number'>
                <Text className='campaign-card__area-body--content--number--amount'>
                  ${donatedAmount} <span>raised of ${target}</span>
                </Text>
                <Text className='campaign-card__area-body--content--number--days'>
                  <ClockCircleOutlined /> {daysLeft} <span>days left</span>
                </Text>
              </div>
            </div>
            <Button
              className='btn btn--secondary-one campaign-card__area-body--button'
              type='default'
              shape='round'
            >
              <Link to={`/campaign/${slug}`}>Support</Link>
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default CampaignCard;
