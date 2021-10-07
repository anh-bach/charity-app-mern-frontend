import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import StarryNightTwo from '../../assets/images/starry_night_2.jpg';
import ForgotPasswordForm from '../../component/form/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <Row>
      <Col sm={24} md={12}>
        <img src={StarryNightTwo} alt='starry night' width={'100%'} />
      </Col>
      <Col sm={24} md={12}>
        <Row>
          <Col span={18} offset={3}>
            <h1>My Happy Fund</h1>
            <h3>Your Ultimate Solution for Fundraising</h3>

            <ForgotPasswordForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
