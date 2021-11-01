import React from 'react';
import { Table, Space, Avatar } from 'antd';

const AdminUsersList = ({ users = [] }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Joined At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Avatar',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo, record) => {
        return photo ? (
          <Avatar src={photo}></Avatar>
        ) : (
          <Avatar style={{ backgroundColor: 'green' }}>{record.name[0]}</Avatar>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (user) => (
        <Space size='middle'>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 360 }}
    />
  );
};

export default AdminUsersList;
