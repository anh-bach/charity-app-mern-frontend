import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import { toast } from 'react-toastify';
import { login } from '../../actions/auth';
import { LOGGED_IN_USER } from '../../actions/types';
import { roleBasedRedirect } from '../../utils/redirect';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  let email = '';
  if (localStorage.getItem('happyFund')) {
    const happyFundObj = JSON.parse(localStorage.getItem('happyFund'));
    if (happyFundObj.user && happyFundObj.user.email) {
      email = happyFundObj.user.email;
    }
  }

  //if user logged in, push user back to home page
  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [user, history]);

  //form submit
  const onFinish = async (values) => {
    try {
      setLoading(true);
      //save email in localStorage then user could use it later on without having to re-type it
      localStorage.setItem(
        'happyFund',
        JSON.stringify({ user: { email: values.email } })
      );

      const res = await login(values);
      const {
        data: { user },
      } = res.data;

      //save user and token in redux store
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
        },
      });

      //toastify
      toast('You are logged in!', { position: 'top-center' });
      //roleBasedRedirect
      roleBasedRedirect(location, history, user.role, setLoading);
    } catch (error) {
      console.log('from login-->', error.response);
      //toastify
      toast.error(error.response.data.errorMessage, { position: 'top-center' });
      setLoading(false);
    }
  };

  //form submit failed
  const onFinishFailed = (errorInfo) => {
    //save email in localStorage then user could use it later on without having to re-type it
    localStorage.setItem(
      'happyFund',
      JSON.stringify({ user: { email: errorInfo.values.email } })
    );

    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='loginForm'
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
        email,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <h2>Sign In To Your Account</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
        ratione.
      </p>
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
      >
        <Input prefix={<UserOutlined />} placeholder='Email' />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item
        name='remember'
        valuePropName='checked'
        wrapperCol={{
          span: 24,
        }}
      >
        <Checkbox>Remember me</Checkbox>
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
          {loading ? <LoadingOutlined /> : ' Sign In'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
