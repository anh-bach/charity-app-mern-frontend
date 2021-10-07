export const roleBasedRedirect = (location, history, role, userId) => {
  //check if intended path from history location state
  const intended = location.state;

  if (intended) {
    history.push(intended.from);
  } else {
    if (role === 'admin') {
      history.push('/admin/dashboard');
    } else if (role === 'user') {
      history.push(`/me/${userId}/dashboard`);
    }
  }
};
