import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Form
      name='categoryForm'
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        name: '',
      }}
    >
      <h3>Create New Category</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
        ratione.
      </p>
      <Form.Item
        label='Category Name'
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input new category name!',
          },
        ]}
        validateTrigger='onBlur'
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
          {loading ? <LoadingOutlined /> : ' Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
