import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import store from './redux/store';


import './App.scss';

import SignInPage from './pages/SignInPage/SignInPage'
import SignUpPage from './pages/SignUpPage/SignUpPage';


function App() {
  return (
    // <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={SignInPage} />
          <Route exact path='/register' component={SignUpPage} />
        </Switch>
      </Router>
    // </Provider>
  );
};

export default App;
