import React from 'react';
import { Row, Col } from 'antd';
import CategoryForm from '../../component/form/CategoryForm';

import DashboardHorizontalNav from '../../component/nav/DashboardNav';

const Category = () => {
  return (
    <div className='container'>
      <DashboardHorizontalNav />
      <Row>
        <Col span='12'>
          <CategoryForm />
        </Col>
        <Col>Category list</Col>
      </Row>
    </div>
  );
};

export default Category;
