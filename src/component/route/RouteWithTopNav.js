import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import TopNav from '../nav/TopNav';

const RouteWithTopNav = ({ component: Component, prevUrl, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Fragment>
          <TopNav {...routeProps} />
          <Component {...routeProps} prevUrl={prevUrl} />
        </Fragment>
      )}
    />
  );
};

export default RouteWithTopNav;
