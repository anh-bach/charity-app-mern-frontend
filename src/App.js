import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassWord from './pages/auth/ResetPassword';
import { getCurrentUser } from './actions/auth';
import { LOGGED_IN_USER } from './actions/types';
import UserRoute from './component/route/UserRoute';
import AdminRoute from './component/route/AdminRoute';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import RouteWithTopNav from './component/route/RouteWithTopNav';
import Category from './pages/admin/Category';
import CategoryUpdate from './pages/admin/CategoryUpdate';
import AdminAccount from './pages/admin/AdminAccount';
import UserAccount from './pages/user/UserAccount';
import UserStartCampaign from './pages/user/UserStartCampaign';
import StripeCallback from './pages/stripe/StripeCallback';
import UserCampaigns from './pages/user/UserCampaigns';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import UserCampaign from './pages/user/UserCampaign';
import UserRouteWithTopNav from './component/route/UserRouteWithTopNav';
import Campaign from './pages/Campaign';
import UserEditCampaign from './pages/user/UserEditCampaign';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const [curUrl, setCurUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //get the current loggedin user
    loadCurrentUser();
  }, []);

  useEffect(() => {
    //saving the previous url -> to redirect the user after loggin
    if (location.pathname !== curUrl) {
      setPrevUrl(curUrl);
      setCurUrl(location.pathname);
    }
  }, [location.pathname]);

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUser();
      const {
        data: { user },
      } = res.data;

      //save user and token in redux store
      dispatch({
        type: LOGGED_IN_USER,
        payload: user,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('From load current user', error);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            height: '100vh',
          }}
        >
          ...loading
        </div>
      ) : (
        <Fragment>
          <ToastContainer />
          <Switch>
            <RouteWithTopNav exact path='/' component={Home} />
            <RouteWithTopNav exact path='/about' component={About} />
            <RouteWithTopNav exact path='/campaigns' component={Campaigns} />
            <RouteWithTopNav
              exact
              path='/campaign/:slug'
              component={Campaign}
            />
            <RouteWithTopNav exact path='/register' component={Register} />
            <RouteWithTopNav
              exact
              path='/login'
              component={Login}
              prevUrl={prevUrl}
            />
            <RouteWithTopNav
              exact
              path='/forgot-password'
              component={ForgotPassword}
            />
            <RouteWithTopNav
              exact
              path='/reset-password/:resetToken'
              component={ResetPassWord}
            />
            {/* User routes */}
            <UserRouteWithTopNav
              exact
              path='/me/campaign-overview/:slug'
              component={UserCampaign}
            />
            <UserRoute
              exact
              path='/me/dashboard/overview'
              component={UserDashboard}
            />
            <UserRoute
              exact
              path='/me/dashboard/campaigns'
              component={UserCampaigns}
            />
            <UserRoute
              exact
              path='/me/dashboard/account'
              component={UserAccount}
            />
            <UserRoute
              exact
              path='/me/dashboard/start-campaign'
              component={UserStartCampaign}
            />
            <UserRoute
              exact
              path='/me/dashboard/edit-campaign/:slug'
              component={UserEditCampaign}
            />
            <UserRoute
              exact
              path='/stripe/callback'
              component={StripeCallback}
            />
            {/* Admin routes */}
            <AdminRoute
              exact
              path='/admin/dashboard/overview'
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path='/admin/dashboard/category/:slug'
              component={CategoryUpdate}
            />
            <AdminRoute
              exact
              path='/admin/dashboard/category'
              component={Category}
            />
            <AdminRoute
              exact
              path='/admin/dashboard/campaigns'
              component={AdminCampaigns}
            />
            <AdminRoute
              exact
              path='/admin/dashboard/users'
              component={AdminUsers}
            />
            <AdminRoute
              exact
              path='/admin/dashboard/account'
              component={AdminAccount}
            />
          </Switch>
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
