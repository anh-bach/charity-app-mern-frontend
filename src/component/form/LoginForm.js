import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import { toast } from 'react-toastify';
import { login } from '../../actions/auth';
import { LOGGED_IN_USER } from '../../actions/types';
import { roleBasedRedirect } from '../../utils/redirect';

const LoginForm = ({ prevUrl }) => {
  const [form] = Form.useForm(); // to use form method
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  //take the email from localStorage if exists
  let email = '';
  if (localStorage.getItem('happyFund')) {
    const happyFundObj = JSON.parse(localStorage.getItem('happyFund'));
    if (happyFundObj.email) {
      email = happyFundObj.email;
    }
  }

  //form submit
  const onFinish = async (values) => {
    try {
      setLoading(true);
      //save email in localStorage then user could use it later on without having to re-type it
      localStorage.setItem(
        'happyFund',
        JSON.stringify({ email: values.email })
      );
      //try to log user in
      const res = await login(values);
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
      toast.success('Successfully logged in!', { position: 'top-center' });
      setLoading(false);

      //redirect user -> if user in login page -> redirect to user page
      //redirect user -> if user in other page -> redirect to the previous page
      //history.goBack();

      roleBasedRedirect(prevUrl, history, user.role, user._id);
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
      JSON.stringify({ email: errorInfo.values.email })
    );
  };

  return (
    <Form
      form={form}
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
        validateTrigger='onBlur'
      >
        <Input prefix={<MailOutlined />} />
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
        validateTrigger='onBlur'
      >
        <Input.Password prefix={<LockOutlined />} />
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
