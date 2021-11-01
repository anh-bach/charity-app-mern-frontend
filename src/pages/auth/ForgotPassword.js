import React from 'react';
import { Row, Col } from 'antd';

// import StarryNightTwo from '../../assets/images/starry_night_2.jpg';
import HoldLove from '../../assets/images/holdlove.jpg';
import ForgotPasswordForm from '../../component/form/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <section className='forgot'>
      <Row className='forgot-area'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 forgot__area__left'>
          <div className='forgot__area__left-area'>
            <img
              className='forgot__area__left-area--img'
              src={HoldLove}
              alt='starry night'
              width={'100%'}
            />
          </div>
          {/* <img src={StarryNightTwo} alt='starry night' width={'100%'} /> */}
        </Col>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 forgot__area__right'>
          <div className='forgot__area__right-block'>
            <div className='forgot__area__right-block-top'>
              <h2 className='forgot__area__right-block-top--logo heading--2'>
                MyHappyFund
              </h2>
              <div>
                <h3 className='forgot__area__right-block-top--heading heading--3'>
                  Forgot Password
                </h3>
                <p className='forgot__area__right-block-top--sub-heading'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque, ratione.
                </p>
              </div>
            </div>
            <div className='forgot__area__right-block-middle'>
              <ForgotPasswordForm />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;
