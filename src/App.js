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
import CustomFooter from './component/footer/CustomFooter';
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
import Users from './pages/admin/Users';
import AdminAccount from './pages/admin/AdminAccount';

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
        token,
        data: { user },
      } = res.data;

      //save user and token in redux store
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          token,
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log('From load current user', error);
      setLoading(false);
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
            <UserRoute
              exact
              path='/me/:userId/dashboard'
              component={UserDashboard}
            />
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
            <AdminRoute exact path='/admin/dashboard/users' component={Users} />
            <AdminRoute
              exact
              path='/admin/dashboard/account'
              component={AdminAccount}
            />
          </Switch>
          <CustomFooter />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
