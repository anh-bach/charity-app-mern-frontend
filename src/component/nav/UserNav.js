import React, { useState } from 'react';
import { Menu } from 'antd';
import { toast } from 'react-toastify';
import { logout } from '../../actions/auth';
import { LOGOUT } from '../../actions/types';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  LogoutOutlined,
  SettingFilled,
  DatabaseFilled,
  DashboardFilled,
  PhoneFilled,
  SaveFilled,
  GroupOutlined,
  ProjectFilled,
  LockFilled,
  ProfileFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const UserNav = () => {
  const [current, setCurrent] = useState('overview');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

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

  return (
    <Menu
      theme='dark'
      onClick={handleClick}
      selectedKeys={[current]}
      mode='inline'
      className='dashboard-usernav'
    >
      <Item
        style={{ marginBottom: '5rem', fontSize: '2rem' }}
        key='logo'
        className='dashboard-usernav__logo heading--2'
      >
        <Link to='/'>MyHappyFund</Link>
      </Item>
      <Item
        key='overview'
        icon={<DashboardFilled />}
        className='dashboard-usernav__item dashboard-usernav__item--overview'
      >
        <Link to='/me/dashboard/overview'>Overview</Link>
      </Item>
      <Item
        key='campaigns'
        icon={<ProjectFilled />}
        className='dashboard-usernav__item dashboard-usernav__item--campaigns'
      >
        <Link to='/me/dashboard/campaigns'>My Campaigns</Link>
      </Item>
      <Item
        key='wishlist'
        icon={<SaveFilled />}
        className='dashboard-usernav__item dashboard-usernav__item--wishlist'
      >
        <Link to='#'>My Wishlist</Link>
      </Item>
      <Item
        key='contributions'
        icon={<DatabaseFilled />}
        className='dashboard-usernav__item dashboard-usernav__item--contributions'
      >
        <Link to='/me/dashboard/donations'>My Donations</Link>
      </Item>
      <Item
        key='contributors'
        icon={<GroupOutlined />}
        className='dashboard-usernav__item dashboard-usernav__item--new-campaign'
      >
        <Link to={`/me/dashboard/start-campaign`}>Start Campaign</Link>
      </Item>

      {/* <Menu.Divider /> */}

      <SubMenu
        key='settings'
        icon={<SettingFilled />}
        title='Settings'
        className='dashboard-usernav__item dashboard-usernav__item--setting'
      >
        <Menu.Item
          key='myAccount'
          icon={<ProfileFilled />}
          className='dashboard-usernav__item--setting--account'
        >
          <Link to='/me/dashboard/account'>My Account</Link>
        </Menu.Item>
        <Menu.Item
          key='updatePassword'
          icon={<LockFilled />}
          className='dashboard-usernav__item--setting--update-password'
        >
          Update Password
        </Menu.Item>
      </SubMenu>
      <Item
        key='help'
        icon={<PhoneFilled />}
        className='dashboard-usernav__item dashboard-usernav__item--help'
      >
        <Link to='#'>Help</Link>
      </Item>
      <Item
        key='signout'
        icon={<LogoutOutlined />}
        className='dashboard-usernav__item dashboard-usernav__item--sign-out'
        onClick={handleLogoutClick}
      >
        Sign Out
      </Item>
    </Menu>
  );
};

export default UserNav;
