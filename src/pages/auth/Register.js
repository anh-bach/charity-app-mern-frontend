import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import HoldLove from '../../assets/images/holdlove.jpg';
import RegisterForm from '../../component/form/RegisterForm';

const Register = () => {
  //if user logged in, push user back to home page
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user && user._id) {
      history.push('/');
    }
  }, [user]);

  return (
    <section className='register'>
      <Row className='register-area'>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 register__area__left'>
          <div className='register__area__left-area'>
            <img
              className='register__area__left-area--img'
              src={HoldLove}
              alt='starry night'
              width={'100%'}
            />
          </div>
        </Col>
        <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 register__area__right'>
          <div className='register__area__right-block'>
            <div className='register__area__right-block-top'>
              <h2 className='register__area__right-block-top--heading heading--2'>
                Register Your Account
              </h2>
            </div>
            <div className='register__area__right-block-middle'>
              <RegisterForm />
            </div>
            <div className='register__area__right-block-bottom'>
              <p className='register__area__right-block-bottom--new-account'>
                Already have an account?{' '}
                <strong>
                  <Link to='/login'>Sign In</Link>
                </strong>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Register;
