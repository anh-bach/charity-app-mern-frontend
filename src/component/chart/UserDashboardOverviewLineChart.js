import React, { Fragment } from 'react';
import Chart from 'react-google-charts';
import moment from 'moment';

const UserDashboardOverviewLineChart = ({ donations }) => {
  const processDonations = donations.map((donation) => [
    moment(donation.createdAt).format('DD-MM-YYYY'),
    donation.amount,
  ]);

  let donationsObj = {};

  for (let i = 0; i < processDonations.length; i++) {
    if (donationsObj[processDonations[0]]) {
      donationsObj[processDonations[i][0]] += processDonations[i][1];
    } else {
      donationsObj[processDonations[i][0]] = processDonations[i][1];
    }
  }

  let donationsArray = [];

  for (let key in donationsObj) {
    donationsArray.push([key, donationsObj[key]]);
  }

  console.log(donationsArray);

  const processData = (data) => {
    const initData = [];

    for (let i = 0; i <= 30; i++) {
      initData.unshift([
        moment(new Date(Date.now() - i * 864e5).toLocaleString()).format(
          'DD-MM-YYYY'
        ),
        0,
      ]);
    }

    initData.forEach((item) => {
      data.forEach((term) => {
        if (term[0] === item[0]) {
          item[1] = term[1];
        }
      });
    });

    return initData;
  };

  const dataDonations = [['Day', 'Donation'], ...processData(donationsArray)];

  const optionsDonation = {
    title: 'Donations Last 30 days',
    curveType: 'function',
    legend: { position: 'right' },
  };

  return (
    <Fragment>
      <Chart
        chartType='LineChart'
        width='100%'
        height='400px'
        data={dataDonations}
        options={optionsDonation}
      />
    </Fragment>
  );
};

export default UserDashboardOverviewLineChart;
