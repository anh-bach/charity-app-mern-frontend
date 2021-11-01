import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const UserDonationsList = ({ donations = [] }) => {
  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'campaign',
      key: 'campaign',
      render: (title, donation) => (
        <Link to={`/campaign/${donation.campaignSlug}`}>{title}</Link>
      ),
    },
    {
      title: 'Donated At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Amount ($)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Campaign Creator',
      dataIndex: 'campaignCreator',
      key: 'campaignCreator',
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={donations}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 480 }}
    />
  );
};

export default UserDonationsList;
