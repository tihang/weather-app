import React from 'react';
import './styles/app.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './helpers/PrivateRoute';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Home from './pages/Home';

export const AuthContext = React.createContext();

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/search/:id" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
