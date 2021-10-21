import axios from 'axios';

export const createCampaign = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-campaign`,
    formData,
    {
      withCredentials: true,
    }
  );
};

export const getCampaignsByUser = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/get-campaigns-by-user`, {
    withCredentials: true,
  });
};

export const getCampaigns = async (status = '') => {
  return await axios.get(
    `${process.env.REACT_APP_API}/admin/campaigns?status=${status}`,
    {
      withCredentials: true,
    }
  );
};

export const updateCampaignByAdmin = async (campaignId, updates) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin/campaign/approve/${campaignId}`,
    updates,
    {
      withCredentials: true,
    }
  );
};
