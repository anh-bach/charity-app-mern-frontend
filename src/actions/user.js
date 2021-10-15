import axios from 'axios';

export const updateUser = async (formData) => {
  return await axios.patch(`${process.env.REACT_APP_API}/updateMe`, formData, {
    withCredentials: true,
  });
};
