import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';
import { LOGGED_IN_USER } from '../../actions/types';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //take the email from localStorage if exists
  let email,
    name = '';

  if (localStorage.getItem('happyFund')) {
    const happyFundObj = JSON.parse(localStorage.getItem('happyFund'));
    if (happyFundObj.email) email = happyFundObj.email;
    if (happyFundObj.name) name = happyFundObj.name;
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      //save the name, email in localStorage
      let formData = {};
      if (localStorage.getItem('happyFund')) {
        formData = JSON.parse(localStorage.getItem('happyFund'));
      }
      if (values.email) formData['email'] = values.email;
      if (values.name) formData['name'] = values.name;
      localStorage.setItem('happyFund', JSON.stringify(formData));

      //register an account
      const res = await register(values);
      const {
        token,
        data: { user },
      } = res.data;

      //save user and token in redux store
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          token,
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
        },
      });

      //toastify
      toast(
        'Your new account has been created! Please check your email and login!',
        {
          position: 'top-center',
        }
      );
      //redirect user to login page
      history.push('/login');
      setLoading(false);
    } catch (error) {
      console.log('from register-->', error.response);
      //toastify
      toast.error(error.response.data.errorMessage, { position: 'top-center' });
      setLoading(false);
    }
  };

  //form submit failed
  const onFinishFailed = (errorInfo) => {
    //save email in localStorage then user could use it later on without having to re-type it
    let formData = {};
    if (localStorage.getItem('happyFund')) {
      formData = JSON.parse(localStorage.getItem('happyFund'));
    }
    if (errorInfo.values.email) formData['email'] = errorInfo.values.email;
    if (errorInfo.values.name) formData['name'] = errorInfo.values.name;

    localStorage.setItem('happyFund', JSON.stringify(formData));

    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='registerForm'
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        email,
        name,
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <h2>Register An Account</h2>
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

      <Form.Item
        label='Create Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'The password should be at least 6 characters!',
          },
        ]}
        validateTrigger='onBlur'
      >
        <Input.Password prefix={<LockOutlined />} type='password' />
      </Form.Item>

      <Form.Item
        label='Confirm Password'
        name='passwordConfirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
        validateTrigger='onChange'
      >
        <Input.Password prefix={<LockOutlined />} type='password' />
      </Form.Item>

      <Form.Item
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox>
          I have read the <Link to='/agreement'>agreement</Link>
        </Checkbox>
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
          {loading ? <LoadingOutlined /> : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
