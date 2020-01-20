import React, { useState } from 'react';
import Axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    Axios.post('/api/user/register', { email, name, password })
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response.data.message));
  };

  return (
    <div>
      <h1>Signup</h1>
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
          name="name"
          type="text"
          placeholder="name"
          autoComplete="off"
          onChange={e => setName(e.target.value)}
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

export default Signup;
