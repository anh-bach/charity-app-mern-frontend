import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Menu from 'antd/lib/menu';
import Avatar from 'antd/lib/avatar';
import {
  DashboardFilled,
  HistoryOutlined,
  HomeFilled,
  LoginOutlined,
  LogoutOutlined,
  ProjectFilled,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { logout } from '../../actions/auth';
import { LOGOUT } from '../../actions/types';

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
        ? (link = '/admin/dashboard')
        : (link = `me/${currentUser._id}/dashboard`);
    }
    return link;
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='logo' style={{ marginRight: 'auto' }}>
        <Link to='/'>Happy Fund</Link>
      </Item>
      <Item key='home' icon={<HomeFilled />}>
        <Link to='/'>Home</Link>
      </Item>
      <Item key='campaigns' icon={<ProjectFilled />}>
        <Link to='/campaigns'>Campaigns</Link>
      </Item>
      <Item key='about' icon={<HistoryOutlined />}>
        <Link to='/about'>About</Link>
      </Item>
      {currentUser ? (
        <SubMenu
          key='SubMenu'
          icon={
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
          }
          title={currentUser && currentUser.name}
        >
          <Item key='dashboard' icon={<DashboardFilled />}>
            <Link to={linkToDashboard()}>Dashboard</Link>
          </Item>
          <Item
            key='logout'
            icon={<LogoutOutlined />}
            onClick={handleLogoutClick}
          >
            Sign Out
          </Item>
        </SubMenu>
      ) : (
        <Fragment>
          <Item key='register' icon={<UserAddOutlined />}>
            <Link to='/register'>Register</Link>
          </Item>
          <Item key='login' icon={<LoginOutlined />}>
            <Link to='/login'>Login</Link>
          </Item>
        </Fragment>
      )}
    </Menu>
  );
};

export default TopNav;
