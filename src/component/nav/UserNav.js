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
  SaveFilled,
  GroupOutlined,
  ProjectFilled,
  LockFilled,
  ProfileFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const UserNav = () => {
  const { userId } = useParams();
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
        <Link to='#'>Overview</Link>
      </Item>
      <Item key='campaigns' icon={<ProjectFilled />}>
        <Link to='#'>My Campaigns</Link>
      </Item>
      <Item key='saved' icon={<SaveFilled />}>
        <Link to='#'>Saved Campaigns</Link>
      </Item>
      <Item key='contributions' icon={<DatabaseFilled />}>
        <Link to='#'>My Contributions</Link>
      </Item>
      <Item key='contributors' icon={<GroupOutlined />}>
        <Link to='#'>Campaign Contributors</Link>
      </Item>

      <SubMenu key='settings' icon={<SettingFilled />} title='Settings'>
        <Menu.Item key='myAccount' icon={<ProfileFilled />}>
          My Account
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

export default UserNav;
