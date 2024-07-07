import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import '../css/Login.css';
import UserContext from '../context/UserContext.js'

const Login = () => {

  const { status, setUser, setStatus } = useContext(UserContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    console.log(data.message.user);
    if (response.ok) {
      setUser(data.message.user.name)
      setStatus(true)
      setMessage('Login successful');
      navigate('/');
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
