import React from 'react';
import 'bootstrap';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
