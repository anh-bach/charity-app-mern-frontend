import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import StarryNight from '../../assets/images/starry_night.jpg';
import LoginForm from '../../component/form/LoginForm';

const Login = () => {
  return (
    <Row>
      <Col sm={0} md={12}>
        <img src={StarryNight} alt='starry night' width={'100%'} />
      </Col>
      <Col sm={24} md={12}>
        <Row>
          <Col span={18} offset={3}>
            <h1>My Happy Fund</h1>
            <h3>Your Ultimate Solution for Fundraising</h3>
            <LoginForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
