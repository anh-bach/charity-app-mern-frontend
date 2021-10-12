import React from 'react';
import { Link } from 'react-router-dom';
import Campaigns from '../../pages/Campaigns';
import { Typography, Button, Card, Progress } from 'antd';
import { HeartOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
// const { Link } = Anchor;

const CampaignCard = ({ image, heading, progressPerc, raisedFund, targetFund, daysLeft }) => {

    return (
        <Card className="campaign-card" bodyStyle={{ padding: "0" }}>
            <div className="campaign-card__area">
                <div className="campaign-card__area-header">
                    <img className="campaign-card__area-header--img" src={image} alt={heading} />
                </div>
                <div className="campaign-card__area-body">
                    <div className="campaign-card__area-body--icon">
                        <div className="campaign-card__area-body--icon-svg">
                            <HeartOutlined />
                        </div>
                    </div>
                    <Title level={3} className="campaign-card__area-body--heading heading--3">{heading}</Title>
                    {/* <Title level={3} className="campaign-card__area-body--heading heading--3"><Link to='/campaigns'>{heading}</Link></Title> */}
                    <div className="campaign-card__area-body--content">
                        <div className="campaign-card__area-body--content--progress">
                            <Text style={
                                {
                                    width: `${progressPerc}% `
                                }} className="campaign-card__area-body--content--progress-percent">{progressPerc}%</Text>
                            <Progress className="campaign-card__area-body--content--progress-bar" percent={progressPerc} showInfo={false} />
                        </div>

                        <div className="campaign-card__area-body--content--number">
                            <Text className="campaign-card__area-body--content--number--amount">${raisedFund} <span>raised of ${targetFund}</span></Text>
                            <Text className="campaign-card__area-body--content--number--days"><ClockCircleOutlined /> {daysLeft} <span>days left</span></Text>
                        </div>
                    </div>
                    <Button className="btn btn--secondary-one campaign-card__area-body--button" type="default" shape="round">
                        Support
                    </Button>
                </div>
            </div>
        </Card >
    );
};

export default CampaignCard;