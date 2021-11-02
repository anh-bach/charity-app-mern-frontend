export const roleBasedRedirect = (prevUrl, history, role) => {
  //check if intended path from history location state

  if (prevUrl) {
    //case pathname is dashboard and user is admin
    if (prevUrl.includes('dashboard') && role === 'admin') {
      history.push('/admin/dashboard/overview');
    }
    //case pathname is dashboard and user is not admin
    else if (prevUrl.includes('dashboard') && role === 'user') {
      history.push('/me/dashboard/overview');
    } else {
      history.push(prevUrl);
    }
  } else {
    if (role === 'admin') {
      history.push('/admin/dashboard/overview');
    } else if (role === 'user') {
      history.push(`/me/dashboard/overview`);
    }
  }
};
