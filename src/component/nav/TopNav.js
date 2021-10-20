import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Menu, Avatar } from 'antd';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../actions/auth';
import { LOGOUT } from '../../actions/types';
import { Header } from 'antd/lib/layout/layout';

const { SubMenu, Item } = Menu;

const TopNav = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(null);
  const [current, setCurrent] = useState(pathname.slice(1));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  //setting the top navbar item according to the pathname
  useEffect(() => {
    setCurrent(pathname.slice(1));
    if (current === 'logo' || current === '') {
      setCurrent('home');
    }
  }, [pathname]);

  //load user if there is current logged in user
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

  //Link to dashboard
  const linkToDashboard = () => {
    let link = '';
    if (currentUser) {
      currentUser.role === 'admin'
        ? (link = '/admin/dashboard/overview')
        : (link = `me/dashboard/overview`);
    }
    return link;
  };

  return (
    <Header
      className='header'
      style={{ position: 'fixed', top: 0, zIndex: 100, width: '100%' }}
    >
      <Menu
        className='header__nav'
        onClick={handleClick}
        selectedKeys={[current]}
        mode='horizontal'
      >
        <Item
          key='logo'
          className='header__nav__left'
          style={{ marginRight: 'auto' }}
        >
          <div className='header__nav__left--logo'>
            <Link to='/'>MyHappyFund</Link>
          </div>
        </Item>
        <Item key='home'>
          <Link to='/'>Home</Link>
        </Item>
        <Item key='campaigns'>
          <Link to='/campaigns'>Campaigns</Link>
        </Item>
        <Item key='about'>
          <Link to='/about'>About</Link>
        </Item>
        {currentUser ? (
          <SubMenu
            key='SubMenu'
            icon={
              currentUser.photo ? (
                <Avatar src={currentUser.photo.url} />
              ) : (
                <Avatar style={{ backgroundColor: '#1d3444' }}>
                  {currentUser.name.split('')[0]}
                </Avatar>
              )
            }
            title={currentUser && currentUser.name.split(' ')[0]}
          >
            <Item key='dashboard' icon={<DashboardOutlined />}>
              <Link to={linkToDashboard()}>Dashboard</Link>
            </Item>
            <Item key='logout' onClick={handleLogoutClick}>
              <LogoutOutlined /> Logout
            </Item>
          </SubMenu>
        ) : (
          <Fragment>
            <Item key='register'>
              <Link to='/register'>Register</Link>
            </Item>
            <Item key='login'>
              <Link to='/login'>Login</Link>
            </Item>
          </Fragment>
        )}
      </Menu>
    </Header>
  );
};

export default TopNav;
