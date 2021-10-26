import React, { useEffect } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import UserPhotoUpload from '../upload/UserPhotoUpload';

const { Option } = Select;
const { RangePicker } = DatePicker;

const CampaignForm = ({
  campaign = {},
  loading,
  setLoading,
  form,
  onFinish,
  campaignPhoto,
  setCampaignPhoto,
  categories,
  action,
}) => {
  const {
    title,
    slogan,
    description,
    imageCover,
    category,
    target,
    from,
    to,
    location,
  } = campaign;

  useEffect(() => {
    form.setFieldsValue({
      title,
      slogan,
      description,
      category: category ? category._id : '',
      target,
      duration: [moment(from), moment(to)],
      location,
    });
  }, [
    form,
    title,
    slogan,
    description,
    imageCover,
    category,
    target,
    from,
    to,
    location,
  ]);

  return (
    <Row>
      <Col span={18} offset={3}>
        <Form
          form={form}
          name='userStartCampaignForm'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete='off'
          encType='multipart/form-data'
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            ratione.
          </p>
          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'A campaign must have a title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Slogan'
            name='slogan'
            rules={[
              {
                required: true,
                message: 'A campaign must have a slogan!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: 'Tell us something about your campaign!',
              },
              {
                min: 100,
                message: 'Description must be longer than 100 characters',
              },
            ]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>

          <Form.Item name='imageCover' label='Campaign Image'>
            <UserPhotoUpload
              photo={campaignPhoto}
              setPhoto={setCampaignPhoto}
              setLoading={setLoading}
            />
          </Form.Item>

          <Form.Item
            name='category'
            label='Category'
            rules={[
              {
                required: true,
                message: 'Please select a campaign category!',
              },
            ]}
          >
            <Select placeholder='Select a category'>
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Target $'
            name='target'
            rules={[
              {
                required: true,
                message: 'A campaign must have a target!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name='duration'
            label='Duration'
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select time!',
              },
            ]}
          >
            <RangePicker
              disabledDate={(current) =>
                current && current.valueOf() < moment()
              }
              format='YYYY-MM-DD'
            />
          </Form.Item>

          <Form.Item
            name='location'
            label='Location'
            rules={[
              {
                required: true,
                message: 'A campaign must have a location!',
              },
            ]}
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
              {loading ? <LoadingOutlined /> : action}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CampaignForm;
