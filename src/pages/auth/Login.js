import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import LoveHand from '../../assets/images/login_desk.jpg';
import LoginForm from '../../component/form/LoginForm';
import { Link } from 'react-router-dom';

const Login = ({ prevUrl }) => {
  //if user logged in, push user back to home page

  return (
    <section className="login">
      <Row className="login__area">
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 login__area__left">
          <div className="login__area__left-area">
            <img className="login__area__left-area--img" src={LoveHand} alt='starry night' width={'100%'} />
          </div>
        </Col>
        <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 login__area__right">
          <div className="login__area__right-block">
            <div className="login__area__right-block-top">
              <h2 className="login__area__right-block-top--logo heading--2">MyHappyFund</h2>
              <div>
                <h3 className="login__area__right-block-top--heading heading--3">Sign In To Your Account</h3>
                <p className="login__area__right-block-top--sub-heading">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
                  ratione.
                </p>
              </div>
            </div>
            <div className="login__area__right-block-middle">
              <LoginForm prevUrl={prevUrl} />
            </div>
            <div className="login__area__right-block-bottom">
              <p className="login__area__right-block-bottom--forgot-password">
                <strong>
                  <Link to='/forgot-password'>Forgot Password</Link>
                </strong>
              </p>
              <p className="login__area__right-block-bottom--new-account">
                Don't have an account yet?{' '}
                <strong>
                  <Link to='/register'>Get Started</Link>
                </strong>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
