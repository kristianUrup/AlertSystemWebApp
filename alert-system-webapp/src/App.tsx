import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Log from "./pages/log/log";

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/log" component={Log} exact />
        </Switch>
      </Router>
  );
};

export default App;
