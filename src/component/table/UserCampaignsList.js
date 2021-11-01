import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';

const UserCampaignsList = ({ campaigns = [] }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      fixed: 'left',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 120,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 120,
    },
    {
      title: 'Donated',
      dataIndex: 'donated',
      key: 'donated',
      width: 120,
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      width: 120,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category) => <Tag color='blue'>{category}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, campaign) => (
        <Space size='middle'>
          <Link to={`/me/dashboard/edit-campaign/${campaign.slug}`}>Edit</Link>
          <a href='#'>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={campaigns}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1500, y: 400 }}
    />
  );
};

export default UserCampaignsList;
