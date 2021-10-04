import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='logo' style={{ marginRight: 'auto' }}>
        <Link to='/'>Happy Fund</Link>
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
      <Item key='register'>
        <Link to='/register'>Register</Link>
      </Item>
      <Item key='login'>
        <Link to='/login'>Login</Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
