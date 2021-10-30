import React from 'react';
import { useLocation } from 'react-router';
import Layout from 'antd/lib/layout';
import { Row, Col } from 'antd';
import {
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  YoutubeFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const CustomFooter = () => {
  const { pathname } = useLocation();

  return (
    <Footer className='footer'>
      <div className='footer__top'>
        <Row className='footer__top__area'>
          <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-15 ant-col-xl-15 footer__top__area--left'>
            <h2 className='footer__top__area--left--heading heading heading-two'>
              MyHappyFund
            </h2>
            <p className='footer__top__area--left--subheading sub-heading'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Col>
          <Col className='footer__top__area--right ant-col-xs-24 ant-col-md-24 ant-col-lg-9 ant-col-xl-9'>
            <Row className='footer__top__area--right--nav'>
              <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 footer__top__area--right--nav-section'>
                <p className='footer__top__area--right--nav-section--heading'>
                  Quick Links
                </p>
                <ul>
                  <li>
                    {pathname !== '/' ? (
                      <Link to='/'>Home</Link>
                    ) : (
                      <a href='#hero'>Home</a>
                    )}
                  </li>
                  <li>
                    {' '}
                    <Link to='/campaigns'>Campaigns</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/about'>About</Link>
                  </li>
                </ul>
              </Col>
              <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8  footer__top__area--right--nav-section'>
                <p className='footer__top__area--right--nav-section--heading'>
                  Membership
                </p>
                <ul>
                  <li>Start A Campaign</li>
                  <li>Donate Now</li>
                </ul>
              </Col>
              <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8  footer__top__area--right--nav-section'>
                <p className='footer__top__area--right--nav-section--heading'>
                  Get Connected
                </p>
                <ul className='footer__top__area--right--nav-section--social'>
                  <li>
                    <FacebookFilled />
                  </li>
                  <li>
                    <TwitterSquareFilled />
                  </li>
                  <li>
                    <LinkedinFilled />
                  </li>
                  <li>
                    <YoutubeFilled />
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='footer__bottom'>
        <Row className='footer__bottom__area'>
          <Col className='ant-col-xs-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-18 footer__bottom__area--left'>
            <p className='footer-area__bottom__area--left--note'>
              © All rights reserved - MyHappyFund
            </p>
          </Col>
          <Col className=' ant-col-xs-24 ant-col-md-24 ant-col-lg-6 ant-col-xl- footer__bottom__area--right'>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms &amp; Conditions</li>
            </ul>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default CustomFooter;
