export const roleBasedRedirect = (prevUrl, history, role, userId) => {
  //check if intended path from history location state

  if (prevUrl) {
    history.push(prevUrl);
  } else {
    if (role === 'admin') {
      history.push('/admin/dashboard');
    } else if (role === 'user') {
      history.push(`/me/${userId}/dashboard`);
    }
  }
};
