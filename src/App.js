import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import TopNav from './component/nav/TopNav';
import CustomFooter from './component/footer/CustomFooter';
import { getCurrentUser } from './actions/auth';
import { LOGGED_IN_USER } from './actions/types';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //get the current loggedin user
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      const {
        data: { user },
      } = res.data;

      //save user and token in redux store
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
        },
      });
    } catch (error) {
      console.log('From load current user', error);
    }
  };

  return (
    <Fragment>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/campaigns' component={Campaigns} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
      <CustomFooter />
    </Fragment>
  );
};

export default App;
