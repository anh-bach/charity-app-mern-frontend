import React, { Fragment } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';
import TopNav from '../nav/TopNav';

const UserRouteWithTopNav = ({
  component: Component,
  prevUrl = '',
  ...rest
}) => {
  const user = useSelector((state) => state.user);
  return user && user._id ? (
    <Route
      {...rest}
      render={(routeProps) => (
        <Fragment>
          <TopNav {...routeProps} />
          <Component {...routeProps} prevUrl={prevUrl} />
        </Fragment>
      )}
    />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRouteWithTopNav;
