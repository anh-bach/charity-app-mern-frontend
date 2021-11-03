import React, { Fragment, useState } from 'react';
import { Steps, Button, Form, Input, Row, Col, InputNumber } from 'antd';
import { TOGGLE_CHECKOUT } from '../../actions/types';
import { makeDonationByUser } from '../../actions/campaign';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const { Step } = Steps;

const Payment = ({
  slug,
  loading,
  setLoading,
  dispatch,
  loadCampaign,
  loadDonations,
}) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Enter Amount',
      content: (
        <Form.Item
          label='Amount'
          name='amount'
          className='form__label'
          rules={[
            {
              required: true,
              message: 'Please input the amount!',
            },
          ]}
          validateTrigger='onBlur'
        >
          <InputNumber className='form__label--input' />
        </Form.Item>
      ),
    },
    {
      title: 'Billing Information',
      content: (
        <Fragment>
          <Form.Item
            label='Full name'
            name='name'
            className='form__label'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input className='form__label--input payment-form-input' />
          </Form.Item>
          <Form.Item label='Address' name='address' className='form__label'>
            <Input className='payment-form-input' placeholder='Ex. Apartment no, building no, street no' />
          </Form.Item>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <Form.Item label='City' name='city' className='form__label'>
                <Input className='payment-form-input' placeholder='Ex. Helsinki' />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label='Country' name='country' className='form__label'>
                <Input className='payment-form-input' placeholder='Ex. Finland' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='Phone Number' name='phone' className='form__label'>
            <Input className='payment-form-input' placeholder='Ex. +123 456 7890' />
          </Form.Item>
        </Fragment>
      ),
    },
    {
      title: 'Make Donation',
      content: (
        <Fragment>
          <Form.Item
            label='Amount'
            name='amount'
            className='form__label'
            rules={[
              {
                required: true,
                message: 'Please input the amount!',
              },
            ]}
            validateTrigger='onBlur'
          >
            <InputNumber className='form__label--input' />
          </Form.Item>
          <Form.Item
            label='Full name'
            name='name'
            className='form__label'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input className='form__label--input payment-form-input' />
          </Form.Item>
          <Form.Item label='Address' name='address' className='form__label'>
            <Input className='payment-form-input' placeholder='Ex. Apartment no, building no, street no' />
          </Form.Item>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <Form.Item label='City' name='city' className='form__label'>
                <Input className='payment-form-input' placeholder='Ex. Helsinki' />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label='Country' name='country' className='form__label'>
                <Input className='payment-form-input' placeholder='Ex. Finland' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='Phone Number' name='phone' className='form__label'>
            <Input className='payment-form-input' placeholder='Ex. +123 456 7890' />
          </Form.Item>
        </Fragment>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleClick = () => {
    dispatch({ type: TOGGLE_CHECKOUT });
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await makeDonationByUser(slug, values);
      await loadCampaign();
      await loadDonations();
      toast.success('Thank you for your support!');
      form.resetFields();
      dispatch({ type: TOGGLE_CHECKOUT });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From on finnish payment', error);
    }
  };

  return (
    <Fragment>
      <div
        className='backdrop'
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: '2',
          backgroundColor: '#000',
          opacity: '90%',
        }}
        onClick={handleClick}
      ></div>
      <div
        className='form--popup'
        style={{
          padding: '4rem',
          position: 'absolute',
          top: '50%',
          width: '50%',
          zIndex: '3',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
        }}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>
          <Form
            form={form}
            onFinish={onFinish}
            name='paymentForm'
            className='form'
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{}}
            autoComplete='off'
          >
            {steps[current].content}
          </Form>
        </div>
        <div className='steps-action'>
          {current < steps.length - 1 && (
            <Button className="btn btn--primary" shape='round' onClick={() => next()}>
              Continue
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' className='btn btn--primary' shape='round' onClick={() => form.submit()}>
              {loading ? <LoadingOutlined /> : 'Done'}
            </Button>
          )}
          {current > 0 && (
            <Button className="btn btn--text btn--back" shape='round' style={{ margin: '0 8px' }} onClick={() => prev()}>
              Back
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
