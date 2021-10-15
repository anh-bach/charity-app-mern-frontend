import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown, Avatar } from 'antd';

const DashboardHorizontalNav = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Link to='/admin/dashboard/account'>My Account</Link>
      </Menu.Item>
      <Menu.Item key='1'>
        <Link to='#'>Update Password</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>Sign Out</Menu.Item>
    </Menu>
  );
  return (
    <Row>
      <Col span={8}>
        <h2>Campaign Categories</h2>
      </Col>
      <Col
        span={8}
        offset={8}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Link to='/campaigns'>Browse Campaigns</Link>
        <Dropdown overlay={menu} trigger={['click']}>
          <Link to='#'>
            {currentUser && currentUser.name}
            <Avatar src={currentUser && currentUser.photo.url} />
          </Link>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default DashboardHorizontalNav;
