import React from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import LoadingToRedirect from './LoadingToRedirect';
import UserNav from '../nav/UserNav';

const UserRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user._id ? (
    <Route
      {...rest}
      render={(routeProps) => (
        <Row>
          <Col span={5}>
            <UserNav {...routeProps} />
          </Col>
          <Col span={19}>
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
