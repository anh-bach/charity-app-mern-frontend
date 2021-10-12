import React from 'react';
import { Typography, Card } from 'antd';
import { GithubOutlined, LinkedinFilled, MailOutlined, SolutionOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TeamCard = ({ image, name, title, portfolioURL, gitHubURL, linkedinURL, email }) => {
    return (
        <Card className="team-card" bodyStyle={{ padding: "0" }}>
            <div className="team-card__ui">
                <div className="team-card__ui-header">
                    <img className="team-card__ui-header--img" src={image} alt={name} />
                </div>
                <div className="team-card__ui-body">
                    <Title level={3} className="team-card__ui-body--name heading--3">{name}</Title>
                    <Text className="team-card__ui-body--title">{title}</Text>
                    <div className="team-card__ui-body--connect">
                        <ul>
                            <li><a href={portfolioURL} target="_blank"> <SolutionOutlined /> Porfolio</a></li>
                            <li><a href={gitHubURL} target="_blank"><GithubOutlined /> GitHub</a></li>
                            <li><a href={linkedinURL} target="_blank"><LinkedinFilled /> Linkedin</a></li>
                            <li><a href={`mailto:${email}`} target="_blank"><MailOutlined /> Email</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card >
    );
};

export default TeamCard;