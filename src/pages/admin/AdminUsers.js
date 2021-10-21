import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../actions/user';
import moment from 'moment';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import AdminUsersList from '../../component/table/AdminUsersList';

const processDataForTable = (data) =>
  data.map((user) => ({
    key: user._id,
    name: user.name,
    createdAt: moment(user.createdAt).format('DD-MM-YYYY'),
    email: user.email,
    photo: user.photo && user.photo.url,
  }));

const AdminUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const dataForTable = processDataForTable(res.data.data.users);
      setUsers(dataForTable);
      setLoading(false);
    } catch (error) {
      console.log('From load all users', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHorizontalNav title='All User List' />
      <AdminUsersList users={users} />
    </div>
  );
};

export default AdminUsers;
