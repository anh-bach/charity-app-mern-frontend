export const roleBasedRedirect = (
  location,
  history,
  role,
  time = 3000,
  setLoading
) => {
  //check if intended path from history location state
  const intended = location.state;

  setTimeout(() => {
    if (intended) {
      history.push(intended.from);
    } else {
      if (role === 'admin') {
        history.push('/admin/dashboard');
      } else if (role === 'user') {
        history.push('/user/history');
      }
    }
  }, time);
  setLoading && setLoading(false);
};
