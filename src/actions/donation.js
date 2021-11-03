import axios from 'axios';

export const getDonationsByCampaign = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/get-donations-by-campaign/${slug}`,
    {
      withCredentials: true,
    }
  );
};

export const getDonationsByUser = async (userId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/get-donations-by-user/${userId}`,
    {
      withCredentials: true,
    }
  );
};

export const getDonationsToUser = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/get-donations-to-user`, {
    withCredentials: true,
  });
};

//Admin action

export const getDonationsByDayForAdmin = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API}/get-donations-by-day-for-admin`,
    {
      withCredentials: true,
    }
  );
};
