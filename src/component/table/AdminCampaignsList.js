import React, { Fragment } from 'react';
import { Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';

const AdminCampaignsList = ({ campaigns = [], handleActionClick }) => {
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
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
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
      render: (campaign) => (
        <Space size='middle'>
          {campaign.status === 'pending' && (
            <Fragment>
              <Link
                to='#'
                onClick={() =>
                  handleActionClick(campaign.key, { status: 'approved' })
                }
              >
                Aprrove
              </Link>
              <Link
                to='#'
                onClick={() =>
                  handleActionClick(campaign.key, { status: 'rejected' })
                }
              >
                Reject
              </Link>
            </Fragment>
          )}

          {campaign.status === 'approved' && (
            <Fragment>
              <Link
                to='#'
                onClick={() =>
                  handleActionClick(campaign.key, { status: 'pending' })
                }
              >
                Investigate
              </Link>
              <Link
                to='#'
                onClick={() =>
                  handleActionClick(campaign.key, { status: 'rejected' })
                }
              >
                Reject
              </Link>
            </Fragment>
          )}

          {campaign.status === 'rejected' && (
            <Fragment>
              <Link
                to='#'
                onClick={() =>
                  handleActionClick(campaign.key, { status: 'approved' })
                }
              >
                Aprrove
              </Link>
              <Link
                to='#'
                onClick={() =>
                  handleActionClick(campaign.key, { status: 'pending' })
                }
              >
                Investigate
              </Link>
            </Fragment>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={campaigns}
      pagination={{ pageSize: 5 }}
      scroll={{ y: 240 }}
    />
  );
};

export default AdminCampaignsList;
