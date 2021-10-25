import React from 'react';
import { Row, Col } from 'antd';
import HoldLove from '../../assets/images/holdlove.jpg';
import ResetPasswordForm from '../../component/form/ResetPasswordForm';

const ForgotPassword = () => {
  return (
    <section className="register">
      <Row className="register_area">
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 register__area__left">
          <div className="register__area__left-area">
            <img className="register__area__left-area--img" src={HoldLove} alt='starry night' width={'100%'} />
          </div>
        </Col>
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 register__area__right">
          <div className="register__area__right-block">
            <div className="register__area__right-block-top">
              <h2 className="register__area__right-block-top--logo heading--2">MyHappyFund</h2>
              <div>
                <h3 className="register__area__right-block-top--heading heading--3">Reset Password</h3>
                <p className="register__area__right-block-top--sub-heading">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque,
                  ratione.
                </p>
              </div>
            </div>
            <div className="register__area__right-block-middle">
              <ResetPasswordForm />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;
