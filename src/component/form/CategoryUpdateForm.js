import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../actions/category';

const CategoryUpdateForm = ({ loading, setLoading, loadCategories }) => {
  const [form] = Form.useForm();
  const { slug } = useParams();
  const [category, setCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadCategory();
  }, [slug]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const res = await getCategory(slug);
      setCategory(res.data.data.category.name);
      form.setFieldsValue({ name: res.data.data.category.name });
      setLoading(false);
    } catch (error) {
      console.log('From loadCategory--->', error);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await updateCategory(slug, values.name);
      loadCategories();
      toast.success('Category updated');
      setLoading(false);
      form.resetFields();
      history.push(`/admin/dashboard/category/${res.data.data.category.slug}`);
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
      <h3>Update Category</h3>
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
        <Input value={category} />
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
  );
};

export default CategoryUpdateForm;
