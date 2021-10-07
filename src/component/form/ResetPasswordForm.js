import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined, LockOutlined } from '@ant-design/icons';
import { LOGGED_IN_USER } from '../../actions/types';
import { createNewPassword } from '../../actions/auth';
import { roleBasedRedirect } from '../../utils/redirect';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await createNewPassword(
        values.password,
        values.passwordConfirm,
        resetToken
      );
      const {
        token,
        data: { user },
      } = res.data;

      //update redux
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
      toast('New password created! You are now logged in!', {
        position: 'top-center',
      });

      setLoading(false);

      //redirect user
      roleBasedRedirect(location, history, user.role);
    } catch (error) {
      console.log('From reset password', error);
      //toastify
      toast.error(error.response.data.errorMessage, { position: 'top-center' });
      setLoading(false);
    }
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
      }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <h2>Reset Password</h2>
      <p>Create your new password here!</p>
      <Form.Item
        label='New Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
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
          {loading ? <LoadingOutlined /> : 'Create Password'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
