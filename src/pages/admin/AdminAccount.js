import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
  HomeFilled,
  PhoneFilled,
} from '@ant-design/icons';

const { Option } = Select;

const AdminAccount = () => {
  const [loading, setLoading] = useState(false);

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

  const onFinish = (values) => {};

  const onGenderChange = (value) => {};

  return (
    <Row>
      <Col span={18} offset={3}>
        <Form
          name='adminAccountForm'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete='off'
        >
          <h2>Admin Account Settings</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            ratione.
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
            label='Email Address'
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
            <Select name='gender' onChange={onGenderChange} allowClear>
              <Option value='male'>male</Option>
              <Option value='female'>female</Option>
              <Option value='other'>other</Option>
            </Select>
          </Form.Item>

          <Form.Item label='Date of Birth'>
            <DatePicker />
          </Form.Item>

          <Form.Item label='Address'>
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
  );
};

export default AdminAccount;
