import React from 'react';
import 'bootstrap';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Auth from './components/auth/Auth';
import { AuthProvider } from './contexts/Auth.context';
import Home from './components/home/Home';
import PrivateRoute from './helpers/PrivateRoute';
import SearchResult from './components/SearchResult/SearchResult';
import Breadcrumbs from './helpers/Breadcrumb';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/auth" component={Auth} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/search" component={SearchResult} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
