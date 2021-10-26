import React from 'react';
import { Row, Col } from 'antd';
import HoldLove from '../../assets/images/holdlove.jpg';
import ResetPasswordForm from '../../component/form/ResetPasswordForm';

const ForgotPassword = () => {
  return (
    <section className="reset">
      <Row className="reset_area">
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 reset__area__left">
          <div className="reset__area__left-area">
            <img className="reset__area__left-area--img" src={HoldLove} alt='starry night' width={'100%'} />
          </div>
        </Col>
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 reset__area__right">
          <div className="reset__area__right-block">
            <div className="reset__area__right-block-top">
              <h2 className="reset__area__right-block-top--logo heading--2">MyHappyFund</h2>
              <div>
                <h3 className="reset__area__right-block-top--heading heading--3">Reset Password</h3>
                <p className="reset__area__right-block-top--sub-heading">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque,
                  ratione.
                </p>
              </div>
            </div>
            <div className="reset__area__right-block-bottom">
              <ResetPasswordForm />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;
