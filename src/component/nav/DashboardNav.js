import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { logout } from '../../actions/auth';
import { LOGOUT } from '../../actions/types';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Dropdown, Avatar } from 'antd';

const DashboardHorizontalNav = ({ title }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  //logout Handler
  const handleLogoutClick = async () => {
    try {
      await logout();
      //clear redux store
      dispatch({ type: LOGOUT });
      //toastify
      toast.success('You are logged out!', {
        position: 'top-center',
      });
      //redirect to homepage
      history.push('/login');
    } catch (error) {
      console.log('From loggout', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Link
          to={
            user && user.role === 'admin'
              ? '/admin/dashboard/account'
              : '/me/dashboard/account'
          }
        >
          My Account
        </Link>
      </Menu.Item>
      <Menu.Item key='1'>
        <Link to='#'>Update Password</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3' onClick={handleLogoutClick}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
  return (
    <section className='dashboard-nav-top'>
      <Row className='dashboard-nav-top__cols'>
        <Col span={16} className='dashboard-nav-top__cols--heading'>
          <span className='heading heading--3'>{title}</span>
        </Col>
        <Col span={4} className='dashboard-nav-top__cols--campaigns'>
          <Link to='/campaigns'>Browse Campaigns</Link>
        </Col>
        <Col span={4} className='dashboard-nav-top__cols--user'>
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
                  <span className='dashboard-nav-top__cols--user-name'>
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Fragment>
              ) : (
                'Loading'
              )}
            </Link>
          </Dropdown>
        </Col>
      </Row>
    </section>
  );
};

export default DashboardHorizontalNav;
