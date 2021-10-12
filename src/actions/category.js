import axios from 'axios';

export const createCategory = async (name) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin/category`,
    {
      name,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteCategory = async (slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/admin/category/${slug}`,
    {
      withCredentials: true,
    }
  );
};

export const updateCategory = async (slug, name) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/admin/category/${slug}`,
    { name },
    {
      withCredentials: true,
    }
  );
};

export const getCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/admin/category/${slug}`,
    {
      withCredentials: true,
    }
  );
};

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/categories`, {
    withCredentials: true,
  });
};
