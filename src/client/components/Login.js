import React, { useState } from 'react';
import Axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/user/login', { email, password })
      .then((res) => {
        setMessage(res.data.message);
        localStorage.setItem('auth-token', res.headers['auth-token']);
      })
      .catch(err => setMessage(err.response.data.message));
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="email"
          autoComplete="off"
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="password"
          autoComplete="off"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>{message}</h3>
    </div>
  );
}

export default Login;
