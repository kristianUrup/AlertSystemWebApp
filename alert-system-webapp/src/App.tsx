import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Log from "./pages/log/log";
import Login from "./pages/login/login";
import {PrivateRoute} from "./pages/shared/PrivateRoute";

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <PrivateRoute route="/" component={Log} redirect="/login"/>
        </Switch>
      </Router>
  );
};

export default App;
