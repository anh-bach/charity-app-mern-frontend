import React from 'react';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createCategory } from '../../actions/category';

const CategoryForm = ({ loading, setLoading, loadCategories }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await createCategory(values.name);
      loadCategories();
      toast.success('Category created');
      setLoading(false);
      form.resetFields();
    } catch (error) {
      console.log('From create category--->', error);
      toast.error('Failed');
      setLoading(false);
    }
  };
  return (
    <Form
      form={form}
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
      onFinish={onFinish}
    >
      <h3>Creat Category</h3>
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
          {loading ? <LoadingOutlined /> : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
