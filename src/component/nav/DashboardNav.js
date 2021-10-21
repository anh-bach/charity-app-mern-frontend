import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown, Avatar } from 'antd';

const DashboardHorizontalNav = ({ title }) => {
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
        <h2>{title}</h2>
      </Col>
      <Col
        span={8}
        offset={8}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Link to='/campaigns'>Browse Campaigns</Link>
        <Dropdown overlay={menu} trigger={['click']}>
          <Link to='#'>
            {currentUser ? (
              <Fragment>
                {currentUser.photo ? (
                  <Avatar src={currentUser.photo.url} />
                ) : (
                  <Avatar style={{ backgroundColor: '#1d3444' }}>
                    {currentUser.name.split('')[0]}
                  </Avatar>
                )}
                <span>{currentUser.name.split(' ')[0]}</span>
              </Fragment>
            ) : (
              'Loading'
            )}
          </Link>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default DashboardHorizontalNav;
