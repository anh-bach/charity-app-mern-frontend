import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user._id) {
      user.role === 'admin' ? setOk(true) : setOk(false);
    }
  }, [user]);
  return ok ? <Route {...rest} /> : <LoadingToRedirect path='/' />;
};

export default AdminRoute;
