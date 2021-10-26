import React from 'react';
import moment from 'moment';
import { Row, Col, Avatar } from 'antd';

const DonationsList = ({ donations = [] }) => {
  const donationCard = (donation = {}) => {
    const { _id, amount, donatedBy, createdAt } = donation;

    return (
      <Row key={_id}>
        <Col>
          {donatedBy.photo ? (
            <Avatar src={donatedBy.photo.url} />
          ) : (
            <Avatar>{donatedBy.name[0]}</Avatar>
          )}
        </Col>
        <Col>
          <h5>{donatedBy.name}</h5>
          <span>
            ${amount.toLocaleString()}, {moment(createdAt).format('MMM Do YY')}
          </span>
        </Col>
      </Row>
    );
  };

  return donations.map((donation) => donationCard(donation));
};

export default DonationsList;
