import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import CustomFooter from '../footer/CustomFooter';
import TopNav from '../nav/TopNav';

const RouteWithTopNav = ({ component: Component, prevUrl, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Fragment>
          <TopNav {...routeProps} />
          <Component {...routeProps} prevUrl={prevUrl} />
          <CustomFooter />
        </Fragment>
      )}
    />
  );
};

export default RouteWithTopNav;
