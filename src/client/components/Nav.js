import React from 'react';
import '../styles/app.scss';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/signup">
        <li>Signup</li>
      </Link>
      <Link to="/login">
        <li>Login</li>
      </Link>
    </ul>
  </nav>
);
export default Nav;
