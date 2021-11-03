import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDonationsByUser } from '../../actions/donation';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import UserDonationsList from '../../component/table/UserDonationsList';

const processDataForTable = (data) =>
  data.map((donation) => ({
    key: donation._id,
    campaign: donation.donatedTo.title,
    createdAt: moment(donation.createdAt).format('DD-MM-YY'),
    amount: donation.amount,
    campaignCreator: donation.donatedTo.createdBy.name,
    campaignSlug: donation.donatedTo.slug,
  }));

const UserDonations = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const res = await getDonationsByUser(user._id);
      const filteredDonations = processDataForTable(res.data.data);
      setDonations(filteredDonations);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From loading donations by user', error);
    }
  };

  return (
    <div className='dashboard-container'>
      <DashboardHorizontalNav title='Donations Overview' />
      <UserDonationsList donations={donations} />
    </div>
  );
};

export default UserDonations;
