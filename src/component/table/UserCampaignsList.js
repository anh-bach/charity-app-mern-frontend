import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';

const UserCampaignsList = ({ campaigns = [] }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, campaign) => {
        if (campaign.status === 'approved') {
          return <Link to={`/campaign/${campaign.slug}`}>{title}</Link>;
        } else {
          return (
            <Link to={`/me/campaign-overview/${campaign.slug}`}>{title}</Link>
          );
        }
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color='blue'>{category}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, campaign) => (
        <Space size='middle'>
          <Link to={`/me/dashboard/edit-campaign/${campaign.slug}`}>Edit</Link>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={campaigns}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 480 }}
    />
  );
};

export default UserCampaignsList;
