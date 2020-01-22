import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './helpers/PrivateRoute';
import Protected from './components/Protected';

export const AuthContext = React.createContext();

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
