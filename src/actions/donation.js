import axios from 'axios';

export const getDonationsByCampaign = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/get-donations-by-campaign/${slug}`,
    {
      withCredentials: true,
    }
  );
};