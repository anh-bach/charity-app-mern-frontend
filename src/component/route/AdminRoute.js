import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';
import AdminNav from '../nav/AdminNav';

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user._id) {
      user.role === 'admin' ? setOk(true) : setOk(false);
    }
  }, [user]);
  return ok ? (
    <Route
      {...rest}
      render={(routeProps) => (
        <Row className='user-route'>
          <Col span={6} className='user-route__nav'>
            <AdminNav {...routeProps} />
          </Col>
          <Col span={18} className='user__dashboard--content'>
            <Component {...routeProps} />
          </Col>
        </Row>
      )}
    />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
