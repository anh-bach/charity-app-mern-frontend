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

//forgot password
export const requestNewPassword = async (email) => {
  return await axios.post(`${process.env.REACT_APP_API}/forgotPassword`, {
    email,
  });
};

//create new password
export const createNewPassword = async (
  password,
  passwordConfirm,
  resetToken
) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/resetPassword/${resetToken}`,
    {
      password,
      passwordConfirm,
    }
  );
};
