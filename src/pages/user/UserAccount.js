import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { LOGGED_IN_USER } from '../../actions/types';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
  HomeFilled,
} from '@ant-design/icons';
import { updateUser } from '../../actions/user';
import { toast } from 'react-toastify';
import UserPhotoUpload from '../../component/upload/UserPhotoUpload';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const { Option } = Select;

const UserAccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  let name, email, gender, dateOfBirth, address, phone, photo;
  if (user) {
    name = user.name;
    email = user.email;
    gender = user.gender;
    dateOfBirth = user.dateOfBirth;
    address = user.address;
    phone = user.phone;
    photo = user.photo;
  }

  useEffect(() => {
    if (photo) {
      setUserPhoto(photo);
    }
  }, [photo]);

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
      // style={{
      //   width: 70,
      // }}
      >
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values) => {
    try {
      //set photo

      values['photo'] = userPhoto;

      setLoading(true);
      const res = await updateUser({
        dateOfBirth: values.dateOfBirth._d,
        ...values,
      });
      const {
        data: { user },
      } = res.data;
      dispatch({
        type: LOGGED_IN_USER,
        payload: user,
      });
      setLoading(false);
      toast.success('Your account has been updated!');
    } catch (error) {
      console.log('From update admin account', error);
      setLoading(false);
      toast.error('Something went wrong! Please try again later!');
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav title='Account Settings' />
      <Row className="account-setting">
        <Col span={24}>
          <Form
            name='userAccountForm'
            initialValues={{
              name: name || '',
              email: email || '',
              gender: gender || '',
              address: address || '',
              dateOfBirth: moment(dateOfBirth),
              phone: phone || '',
            }}
            onFinish={onFinish}
            autoComplete='off'
            encType='multipart/form-data'
          >
            <Form.Item
              label='Fullname'
              name='name'
              className="start-campaign__form--label"
              rules={[
                {
                  required: true,
                  message: 'Please input your fullname!',
                },
              ]}
            >
              <Input className="start-campaign__form--input" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              className="start-campaign__form--label"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid email!',
                },
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input className="start-campaign__form--input" prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item name='gender' className="start-campaign__form--label" label='Gender'>
              <Select name='gender' className="start-campaign__form--select" allowClear>
                <Option value='male'>male</Option>
                <Option value='female'>female</Option>
                <Option value='other'>other</Option>
              </Select>
            </Form.Item>

            <Form.Item name='dateOfBirth' className="start-campaign__form--label" label='Date of Birth'>
              <DatePicker
                className="start-campaign__form--input"
                disabledDate={(current) =>
                  current && current.valueOf() > moment()
                }
              />
            </Form.Item>
            <Form.Item name='photo' className="start-campaign__form--label" label='User Photo'>
              <UserPhotoUpload
                setLoading={setLoading}
                photo={userPhoto}
                setPhoto={setUserPhoto}
              />
            </Form.Item>

            <Form.Item name='address' className="start-campaign__form--label" label='Address'>
              <Input className="start-campaign__form--input" prefix={<HomeFilled />} />
            </Form.Item>

            <Form.Item name='phone' className="start-campaign__form--label" label='Phone Number'>
              <Input
                addonBefore={prefixSelector}
                className="start-campaign__form--input"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button
                htmlType='submit'
                shape="round"
                className="start-campaign__form__btn btn btn--primary"
              >
                {loading ? <LoadingOutlined /> : 'Update'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserAccount;
