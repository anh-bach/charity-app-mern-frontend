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
    <Row className='start-campaign'>
      <Col span={24}>
        <Form
          form={form}
          name='userCampaignForm'
          initialValues={{}}
          onFinish={onFinish}
          autoComplete='off'
          encType='multipart/form-data'
          className='start-campaign__form'
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            ratione.
          </p>
          <Form.Item
            className='start-campaign__form--label'
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'A campaign must have a title!',
              },
            ]}
          >
            <Input className='start-campaign__form--input' />
          </Form.Item>

          <Form.Item
            className='start-campaign__form--label'
            label='Slogan'
            name='slogan'
            rules={[
              {
                required: true,
                message: 'A campaign must have a slogan!',
              },
            ]}
          >
            <Input className='start-campaign__form--input' />
          </Form.Item>

          <Form.Item
            className='start-campaign__form--label'
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
            <Input.TextArea rows={8} className='start-campaign__form--input' />
          </Form.Item>

          <Form.Item
            name='imageCover'
            label='Campaign Image'
            className='start-campaign__form--label'
          >
            <UserPhotoUpload
              photo={campaignPhoto}
              setPhoto={setCampaignPhoto}
              setLoading={setLoading}
            />
          </Form.Item>

          <Form.Item
            className='start-campaign__form--label'
            name='category'
            label='Category'
            rules={[
              {
                required: true,
                message: 'Please select a campaign category!',
              },
            ]}
          >
            <Select
              placeholder='Select a category'
              className='start-campaign__form--select'
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className='start-campaign__form--label'
            label='Target $'
            name='target'
            rules={[
              {
                required: true,
                message: 'A campaign must have a target!',
              },
            ]}
          >
            <InputNumber className='start-campaign__form--input' />
          </Form.Item>

          <Form.Item
            className='start-campaign__form--label'
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
              className='start-campaign__form--date-range'
              disabledDate={(current) =>
                current && current.valueOf() < moment()
              }
              format='YYYY-MM-DD'
            />
          </Form.Item>

          <Form.Item
            className='start-campaign__form--label'
            name='location'
            label='Location'
            rules={[
              {
                required: true,
                message: 'A campaign must have a location!',
              },
            ]}
          >
            <Input className='start-campaign__form--input' />
          </Form.Item>

          <Button
            htmlType='submit'
            shape='round'
            className='start-campaign__form__btn btn btn--primary'
          >
            {loading ? <LoadingOutlined /> : action}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CampaignForm;
