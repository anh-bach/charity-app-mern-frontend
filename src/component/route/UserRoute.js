import React from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { Row, Col, Layout } from 'antd';
import LoadingToRedirect from './LoadingToRedirect';
import UserNav from '../nav/UserNav';

// const { Header, Content, Footer, Sider } = Layout;

const UserRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user._id ? (
    <Route
      {...rest}
      render={(routeProps) => (
        // <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Row className="user-route">
          <Col span={6} className="user-route__nav">
            {/* <Col className="ant-col-xs-24 ant-col-md-24 ant-col-lg-6 ant-col-xl-6"> */}
            <UserNav {...routeProps} />
          </Col>
          <Col span={18} style={{ backgroundColor: "#e3e8ec", padding: '2rem' }}>
            <Component {...routeProps} />
          </Col>
        </Row>
      )}
    />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;

{/* <Layout className="user-route">
  <Sider style={{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
  }} className="user-route__nav">
    <UserNav {...routeProps} />
  </Sider>
  <Layout className="site-layout">
    <Content>
      <Component {...routeProps} />
    </Content>
  </Layout>
</Layout>; */}