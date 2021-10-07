import React from 'react';
import { Row, Col } from 'antd';
import StarryJar from '../../assets/images/starry_jar.jpg';
import ResetPasswordForm from '../../component/form/ResetPasswordForm';

const ForgotPassword = () => {
  return (
    <Row>
      <Col sm={24} md={12}>
        <img src={StarryJar} alt='starry night' width={'100%'} />
      </Col>
      <Col sm={24} md={12}>
        <Row>
          <Col span={18} offset={3}>
            <h1>My Happy Fund</h1>
            <h3>Your Ultimate Solution for Fundraising</h3>

            <ResetPasswordForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
