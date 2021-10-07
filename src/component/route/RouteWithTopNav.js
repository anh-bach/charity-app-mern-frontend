import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import TopNav from '../nav/TopNav';

const RouteWithTopNav = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Fragment>
          <TopNav {...routeProps} />
          <Component {...routeProps} />
        </Fragment>
      )}
    />
  );
};

export default RouteWithTopNav;
