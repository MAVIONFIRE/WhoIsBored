import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const mockAuth = (username, password, email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'testuser' && password === '123') {
        resolve({ token: 'fake-jwt-token', userId: '123' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await mockAuth(username, password, email);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Sign in to your account' : 'Create a new account'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            id="username"
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="input-group">
            <input
              id="email"
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}
        <div className="input-group">
          <input
            id="password"
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </form>
      <div className="toggle-form">
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need to create an account?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;