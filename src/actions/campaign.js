import axios from 'axios';

//Public actions
export const getCampaigns = async (page = 1, limit = 3) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/campaigns?page=${page}&limit=${limit}`
  );
};

export const getCampaign = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/campaign/${slug}`);
};

export const getActiveCampaignsTotal = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/count-active-campaigns`);
};

// User actions

export const createCampaign = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-campaign`,
    formData,
    {
      withCredentials: true,
    }
  );
};

export const updateCampaignByUser = async (slug, formData) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/update-campaign-by-user/${slug}`,
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

export const getCampaignByUser = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/get-campaign-by-user/${slug}`,
    {
      withCredentials: true,
    }
  );
};

// Admin actions

export const getCampaignsByAdmin = async (status = '') => {
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
