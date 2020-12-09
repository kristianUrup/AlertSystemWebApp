import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Log from "./pages/log/log";
import Login from "./pages/login/login";
import {PrivateRoute} from "./pages/shared/PrivateRoute";

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRoute route="/log" component={Log} redirect="/login"/>
        </Switch>
      </Router>
  );
};

export default App;
