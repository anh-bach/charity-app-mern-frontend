import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import TopNav from './component/nav/TopNav';
import CustomFooter from './component/footer/CustomFooter';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassWord from './pages/auth/ResetPassword';
import { getCurrentUser } from './actions/auth';
import { LOGGED_IN_USER } from './actions/types';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //get the current loggedin user
    loadCurrentUser();
  }, []);

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
          <TopNav />
          <ToastContainer />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/campaigns' component={Campaigns} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route
              exact
              path='/reset-password/:resetToken'
              component={ResetPassWord}
            />
          </Switch>
          <CustomFooter />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
