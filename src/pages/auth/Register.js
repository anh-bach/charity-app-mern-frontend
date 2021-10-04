import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Galaxy from '../../assets/images/galaxy.jpg';
import RegisterForm from '../../component/form/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Row>
      <Col sm={24} md={12}>
        <img src={Galaxy} alt='galaxy' width={'100%'} />
      </Col>
      <Col sm={24} md={12}>
        <Row>
          <Col span={18} offset={3}>
            <h1>My Happy Fund</h1>
            <h3>Your Ultimate Solution for Fundraising</h3>
            <RegisterForm />
            <p className='text-center'>
              Already have an account?{' '}
              <strong>
                <Link to='/login'>Sign In</Link>
              </strong>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
