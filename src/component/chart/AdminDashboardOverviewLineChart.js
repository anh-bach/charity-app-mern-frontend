import React, { Fragment } from 'react';
import Chart from 'react-google-charts';
import moment from 'moment';

const AdminDashboardOverviewLineChart = ({ donations, campaignsByDay }) => {
  const processDonations = donations.map((donation) => [
    donation.dateDMY,
    donation.count,
  ]);

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

  console.log(processData(processDonations));

  const processCampaigns = campaignsByDay.map((campaign) => [
    campaign.dateDMY,
    campaign.count,
  ]);

  const dataDonations = [['Day', 'Donation'], ...processData(processDonations)];
  const dataCampaigns = [
    ['Day', 'Campaigns'],
    ...processData(processCampaigns),
  ];
  const optionsDonation = {
    title: 'Donations Last 30 days',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  const optionsCampaigns = {
    title: 'Campaigns Submitted Last 30 days',
    curveType: 'function',
    legend: { position: 'bottom' },
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
      <Chart
        chartType='LineChart'
        width='100%'
        height='400px'
        data={dataCampaigns}
        options={optionsCampaigns}
      />
    </Fragment>
  );
};

export default AdminDashboardOverviewLineChart;
