import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Card, Badge, Avatar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import {
  getAccountBalance,
  payoutSetting,
  currencyFormatter,
} from '../../actions/stripe';

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const user = useSelector((state) => state.user);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAccountBalance();
  }, []);

  const loadAccountBalance = async () => {
    try {
      const res = await getAccountBalance();

      setBalance(res.data.data);
    } catch (error) {
      console.log('from load account balance', error);
    }
  };

  const handlePayoutSetting = async () => {
    try {
      setLoading(true);
      const res = await payoutSetting();
      console.log(res.data);
      return;
      window.location.href = res.data.url;
      setLoading(false);
    } catch (error) {
      console.log('from load payout setting', error);
      toast.error('Unable to access settings. Try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {user && user.stripe_seller && user.stripe_seller.charges_enabled && (
        <Fragment>
          <Ribbon text='Available' color='blue'>
            <Card className='bg-light pt-1'>
              {balance &&
                balance.pending &&
                balance.pending.map((item, index) => (
                  <span key={index} className='lead'>
                    {currencyFormatter(item)}
                  </span>
                ))}
            </Card>
          </Ribbon>

          <Ribbon text='Payout' color='silver'>
            <Card
              className='bg-light pt-1 pointer'
              onClick={handlePayoutSetting}
            >
              <SettingOutlined className='text-center' />
            </Card>
          </Ribbon>
        </Fragment>
      )}
    </div>
  );
};

export default ConnectNav;
