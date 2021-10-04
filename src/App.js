import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import TopNav from './component/nav/TopNav';
import CustomFooter from './component/footer/CustomFooter';

const App = () => {
  return (
    <Router>
      <TopNav />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/campaigns' component={Campaigns} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
      <CustomFooter />
    </Router>
  );
};

export default App;
