import axios from 'axios';

export const updateUser = async (formData) => {
  return await axios.patch(`${process.env.REACT_APP_API}/updateMe`, formData, {
    withCredentials: true,
  });
};

export const getAllUsers = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API}/users?fields=name,email,photo,role`,
    {
      withCredentials: true,
    }
  );
};
