import React, { useContext } from 'react';
import 'bootstrap';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Auth from './components/auth/Auth';
import { AuthProvider } from './contexts/Auth.context';
import Home from './components/home/Home';
import PrivateRoute from './helpers/PrivateRoute';
import SearchResult from './components/SearchResult/SearchResult';
import Artist from './components/Artist/Artist';

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/auth" component={Auth} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/artists" component={SearchResult} />
          <PrivateRoute exact path="/artists/:id" component={Artist} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
