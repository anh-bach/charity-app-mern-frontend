import React, { useState } from 'react';
import { useParams } from 'react-router';
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
  GroupOutlined,
  ProjectFilled,
  LockFilled,
  ProfileFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const AdminNav = () => {
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
    >
      <Item
        className='user-nav__logo'
        style={{ marginBottom: '5rem', fontSize: '2rem' }}
        key='logo'
      >
        <Link to='/'>My Happy Fund</Link>
      </Item>
      <Item key='overview' icon={<DashboardFilled />}>
        <Link to='/admin/dashboard/overview'>Overview</Link>
      </Item>
      <Item key='campaigns' icon={<ProjectFilled />}>
        <Link to='/admin/dashboard/category'>Category</Link>
      </Item>
      <Item key='contributions' icon={<DatabaseFilled />}>
        <Link to='/admin/dashboard/campaigns'>Campaigns</Link>
      </Item>
      <Item key='saved' icon={<UserOutlined />}>
        <Link to='/admin/dashboard/users'>Users</Link>
      </Item>
      <Item key='contributors' icon={<GroupOutlined />}>
        <Link to='#'>Contributors</Link>
      </Item>

      <Menu.Divider />

      <SubMenu key='settings' icon={<SettingFilled />} title='Settings'>
        <Menu.Item key='myAccount' icon={<ProfileFilled />}>
          <Link to='/admin/dashboard/account'>My Account</Link>
        </Menu.Item>
        <Menu.Item key='updatePassword' icon={<LockFilled />}>
          Update Password
        </Menu.Item>
      </SubMenu>
      <Item key='help' icon={<PhoneFilled />}>
        <Link to='#'>Help</Link>
      </Item>
      <Item key='signout' icon={<LogoutOutlined />} onClick={handleLogoutClick}>
        Sign Out
      </Item>
    </Menu>
  );
};

export default AdminNav;
