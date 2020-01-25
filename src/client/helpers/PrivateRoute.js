import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { isLoggedIn } from './Auth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, loginStatus, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn() === true ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

export default PrivateRoute;
