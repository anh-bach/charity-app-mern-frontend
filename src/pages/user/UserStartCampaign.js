import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import { getCategories } from '../../actions/category';
import { createConnectAccount } from '../../actions/stripe';
import { createCampaign } from '../../actions/campaign';
import CampaignForm from '../../component/form/CampaignForm';

const UserStartCampaign = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [campaignPhoto, setCampaignPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data.data.categories);

      setLoading(false);
    } catch (error) {
      console.log('From load categories -> start campaign', error);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      //set imageCover + from and to
      values['imageCover'] = campaignPhoto;
      values['from'] = values.duration[0]._d;
      values['to'] = values.duration[1]._d;
      await createCampaign(values);
      toast.success('New campaign created!');
      setLoading(false);
      setCampaignPhoto(null);
      form.resetFields();
    } catch (error) {
      console.log('From create campaign', error);
      toast.error('Something wrong happened. Please try again later!');
    }
  };

  const connected = () => (
    <CampaignForm
      loading={loading}
      setLoading={setLoading}
      form={form}
      onFinish={onFinish}
      campaignPhoto={campaignPhoto}
      setCampaignPhoto={setCampaignPhoto}
      categories={categories}
      action='Create Campaign'
    />
  );

  const notConnected = () => (
    <Row>
      <Col span={18} offset={3}>
        <h4>Setup your payouts to start your campaigns</h4>
        <p className='lead'>
          MyHappyFund partners with stripe to transfer donations to your bank
          account
        </p>
        <button
          disabled={loading}
          onClick={handleClick}
          className='btn btn-primary mb-3'
        >
          {loading ? 'Processing' : 'Setup Payouts'}
        </button>
        <p className='text-muted'>
          You will be redirected to stripe.com to complete onboarding process
        </p>
      </Col>
    </Row>
  );

  const handleClick = async () => {
    try {
      const res = await createConnectAccount();
      console.log('stripe link', res.data);
      window.location.href = res.data.data;
      setLoading(false);
    } catch (error) {
      console.log('From Dashboard seller button click', error.response);
      toast.error('Stripe conneted failed, try again.');
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='Start New Campaign' />

      {user && user.stripe_seller && user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </div>
  );
};

export default UserStartCampaign;
