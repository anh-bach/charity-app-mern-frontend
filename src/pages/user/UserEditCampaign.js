import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CampaignForm from '../../component/form/CampaignForm';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import { getCategories } from '../../actions/category';
import {
  createCampaign,
  getCampaignByUser,
  updateCampaignByUser,
} from '../../actions/campaign';

const UserEditCampaign = () => {
  const { slug } = useParams();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [campaignPhoto, setCampaignPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [campaign, setCampaign] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
    loadCampaign();
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

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const res = await getCampaignByUser(slug);
      setCampaign(res.data.data);
      setCampaignPhoto(res.data.data.imageCover);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From loading campaign', error);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      //set imageCover + from and to
      values['imageCover'] = campaignPhoto;
      values['from'] = values.duration[0]._d;
      values['to'] = values.duration[1]._d;
      const res = await updateCampaignByUser(slug, values);
      console.log(res.data);
      toast.success('Campaign created!');
      setLoading(false);
    } catch (error) {
      console.log('From create campaign', error);
      toast.error('Something wrong happened. Please try again later!');
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='Update Campaign' />

      {user && user.stripe_seller && user.stripe_seller.charges_enabled && (
        <CampaignForm
          campaign={campaign}
          loading={loading}
          setLoading={setLoading}
          form={form}
          onFinish={onFinish}
          campaignPhoto={campaignPhoto}
          setCampaignPhoto={setCampaignPhoto}
          categories={categories}
          action='Update'
        />
      )}
    </div>
  );
};

export default UserEditCampaign;
