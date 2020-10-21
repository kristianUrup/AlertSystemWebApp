import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import {Home} from 'pages/home/home';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
  );
};

export default App;
