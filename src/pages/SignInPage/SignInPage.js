import React, { Fragment } from 'react';
//import { Redirect } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import HeroBanner from '../../components/Main/HeroBanner/HeroBanner';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import SignInForm from '../../components/SignInForm/SignInForm';
//import Alert from '../../components/Alert/Alert';
import { Navbar } from 'react-bootstrap';
import heroImage from '../../Assets/bg-img-1.jpg';

const SignInPage = () => {
  // const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  // //redirect user to dashboard page if user logged in successfully
  // if (isAuthenticated && !loading && user) {
  //   return <Redirect to='/home' />;
  // }

  return (
    <Fragment>
      <Row className='sign-in-page'>
        <Navbar fixed='top' className='navbar'>
          <Navbar.Brand className='logo' href='/'>
            DevNet
          </Navbar.Brand>

          <Navbar.Collapse className='justify-content-end'>
            <div className='sign-up__link'>
              Dont have an account? <Link to='/register'>Get Started</Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Col sm={6} className='banner-area'>
          <HeroBanner
            imageSrc={heroImage}
            quote="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            name='Johnathon Doe'
            title='UI Developer'
          />
        </Col>
        <Col sm={6} className='form-area'>
          {/* <Alert /> */}
          <SignInForm />
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignInPage;
