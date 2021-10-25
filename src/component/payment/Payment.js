import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Steps,
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  InputNumber,
} from 'antd';
import { TOGGLE_CHECKOUT } from '../../actions/types';

const { Step } = Steps;

const Payment = () => {
  const dispatch = useDispatch();
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
            <Input className='form__label--input' />
          </Form.Item>
          <Form.Item label='Address' name='address' className='form__label'>
            <Input placeholder='Ex. Apartment no, building no, street no' />
          </Form.Item>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <Form.Item label='City' name='city' className='form__label'>
                <Input placeholder='Ex. Helsinki' />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label='Country' name='country' className='form__label'>
                <Input placeholder='Ex. Finland' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='Phone Number' name='phone' className='form__label'>
            <Input placeholder='Ex. +123 456 7890' />
          </Form.Item>
        </Fragment>
      ),
    },
    {
      title: 'Payment Method',
      content: (
        <Form.Item label='Phone Number' name='phone' className='form__label'>
          <Input placeholder='Ex. +123 456 7890' />
        </Form.Item>
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

  const onFinish = (values) => {
    const formData = form.getFieldsValue(true);
    console.log(formData);
    console.log(values);
  };

  return (
    <Fragment>
      <div
        className='backdrop'
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          zIndex: '2',
          width: '100%',
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
          top: '5%',
          width: '50%',
          zIndex: '3',
          left: '50%',
          transform: 'translateX(-50%)',
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
            <Button type='primary' onClick={() => next()}>
              Continue
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type='primary'
              onClick={() => {
                message.success('Processing complete!');
                form.submit();
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Back
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
