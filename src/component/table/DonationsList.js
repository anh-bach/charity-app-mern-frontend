import React from 'react';
import moment from 'moment';
import { Row, Col, Avatar } from 'antd';

const DonationsList = ({ donations = [] }) => {
  const donationCard = (donation = {}) => {
    const { _id, amount, donatedBy, createdAt } = donation;

    return (
      <Row key={_id} className="user-card" >
        <Col className="user-card__left" span={6}>
          {donatedBy.photo ? (
            <Avatar className="user-card__left--avatar" src={donatedBy.photo.url} />
          ) : (
            <Avatar className="user-card__left--avatar" >{donatedBy.name[0]}</Avatar>
          )}
        </Col>
        <Col span={18} className="user-card__right">
          <h4 className="user-card__right--title">{donatedBy.name}</h4>
          <p className="user-card__right--sub-title">
            {`$${amount.toLocaleString()}`}, {moment(createdAt).format('MMM Do YY')}
          </p>
        </Col>
      </Row>
    );
  };

  return donations.map((donation) => donationCard(donation));
};

export default DonationsList;