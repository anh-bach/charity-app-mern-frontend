import React, { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { getAccountStatus } from '../../actions/stripe';
import { LOGGED_IN_USER } from '../../actions/types';

const StripeCallback = ({ history }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      loadAccountStatus();
    }
  }, [user]);

  const loadAccountStatus = async () => {
    try {
      const res = await getAccountStatus();
      dispatch({ type: LOGGED_IN_USER, payload: res.data.data });
      history.push('/me/dashboard/start-campaign');
    } catch (error) {
      console.log('From load account status', error);
    }
  };

  return (
    <div>
      <div>Loading...</div>
      <LoadingOutlined className='display-1 p-5 text-danger' />
    </div>
  );
};

export default StripeCallback;
