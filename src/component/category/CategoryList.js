import React, { Fragment } from 'react';
import { Table, Tag } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Column } = Table;

const CategoryList = ({ loading, categoryList, handleRemove }) => {
  return (
    <Fragment>
      <h3>{loading ? 'Loading....' : 'Category List'}</h3>
      <Table
        dataSource={
          categoryList
            ? categoryList.map((item) => ({
                key: item._id,
                ...item,
              }))
            : []
        }
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      >
        <Column title='Name' dataIndex='name' key='name' />
        <Column
          title='Tags'
          dataIndex='slug'
          key='tags'
          render={(slug) => (
            <Tag color='blue' key='tag'>
              {slug}
            </Tag>
          )}
        />

        <Column
          title='Edit'
          key='edit'
          dataIndex='slug'
          render={(slug) => (
            <Link to={`/admin/dashboard/category/${slug}`}>
              <EditFilled />
            </Link>
          )}
        />
        <Column
          title='Delete'
          key='delete'
          dataIndex='slug'
          render={(slug) => (
            <DeleteFilled
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleRemove(slug)}
            />
          )}
        />
      </Table>
    </Fragment>
  );
};

export default CategoryList;
