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
        style={{
          width: 70,
        }}
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
      <Row>
        <Col span={18} offset={3}>
          <Form
            name='userAccountForm'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              name: name || '',
              email: email || '',
              gender: gender || '',
              address: address || '',
              dateOfBirth: moment(new Date(dateOfBirth)) || '',
              phone: phone || '',
            }}
            onFinish={onFinish}
            autoComplete='off'
            encType='multipart/form-data'
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque, ratione.
            </p>
            <Form.Item
              label='Fullname'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your fullname!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
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
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item name='gender' label='Gender'>
              <Select name='gender' allowClear>
                <Option value='male'>male</Option>
                <Option value='female'>female</Option>
                <Option value='other'>other</Option>
              </Select>
            </Form.Item>

            <Form.Item name='dateOfBirth' label='Date of Birth'>
              <DatePicker
                disabledDate={(current) =>
                  current && current.valueOf() > moment()
                }
              />
            </Form.Item>
            <Form.Item name='photo' label='User Photo'>
              <UserPhotoUpload
                setLoading={setLoading}
                photo={userPhoto}
                setPhoto={setUserPhoto}
              />
            </Form.Item>

            <Form.Item name='address' label='Address'>
              <Input prefix={<HomeFilled />} />
            </Form.Item>

            <Form.Item name='phone' label='Phone Number'>
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
              />
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
