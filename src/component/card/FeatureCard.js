import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const FeatureCard = ({ keyVal, heading, text }) => {
    return (
        <Card className="feature-card">
            <div className="feature-card__area">
                <Text className="feature-card__area--key" level={3}>{keyVal}</Text>
                <Title className="feature-card__area--heading heading heading--3" level={3}>{heading}</Title>
                <Text className="feature-card__area--body-text paragraph paragraph--1">{text}</Text>
            </div>
        </Card>
    );
};

export default FeatureCard;