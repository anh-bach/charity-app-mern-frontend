import axios from 'axios';

//Login
export const login = async ({ email, password, remember }) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login`,
    {
      email,
      password,
      remember,
    },
    {
      withCredentials: true,
    }
  );
};

//Logout
export const logout = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/logout`, {
    withCredentials: true,
  });
};

//get current user
export const getCurrentUser = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/me`, {
    withCredentials: true,
  });
};

//register account
export const register = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user, {
    withCredentials: true,
  });
};
