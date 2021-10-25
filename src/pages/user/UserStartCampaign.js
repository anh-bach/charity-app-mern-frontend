import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Select,
} from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';

import { LoadingOutlined } from '@ant-design/icons';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import { getCategories } from '../../actions/category';
import UserPhotoUpload from '../../component/upload/UserPhotoUpload';
import { createConnectAccount } from '../../actions/stripe';
import { createCampaign } from '../../actions/campaign';

const { RangePicker } = DatePicker;
const { Option } = Select;

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
    <Row>
      <Col span={18} offset={3}>
        <Form
          form={form}
          name='userStartCampaignForm'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete='off'
          encType='multipart/form-data'
          // className="form-area"
        >
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            ratione.
          </p> */}
          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'A campaign must have a title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Slogan'
            name='slogan'
            rules={[
              {
                required: true,
                message: 'A campaign must have a slogan!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: 'Tell us something about your campaign!',
              },
              {
                min: 100,
                message: 'Description must be longer than 100 characters',
              },
            ]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>

          <Form.Item name='imageCover' label='Campaign Image'>
            <UserPhotoUpload
              photo={campaignPhoto}
              setPhoto={setCampaignPhoto}
              setLoading={setLoading}
            />
          </Form.Item>

          <Form.Item
            name='category'
            label='Category'
            rules={[
              {
                required: true,
                message: 'Please select a campaign category!',
              },
            ]}
          >
            <Select placeholder='Select a category'>
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Target $'
            name='target'
            rules={[
              {
                required: true,
                message: 'A campaign must have a target!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name='duration'
            label='Duration'
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select time!',
              },
            ]}
          >
            <RangePicker
              disabledDate={(current) =>
                current && current.valueOf() < moment()
              }
              format='YYYY-MM-DD'
            />
          </Form.Item>

          <Form.Item
            name='location'
            label='Location'
            rules={[
              {
                required: true,
                message: 'A campaign must have a location!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{
                display: 'block',
                width: '100%',
                height: '5rem',
                borderRadius: '10rem',
              }}
            >
              {loading ? <LoadingOutlined /> : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
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
