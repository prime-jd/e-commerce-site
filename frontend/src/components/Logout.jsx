import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import '../css/Logout.css';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser, setStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const handleLogout = () => {
    fetch('/api/v1/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers if required by your backend
      },
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Logged out successfully');
          setUser('');
          setStatus(false);
          localStorage.removeItem('user');
          localStorage.removeItem('status');
    
          // navigate('/');
        } else {
          console.error('Failed to logout');
        }
      })
      .catch((err) => {
        console.error('Logout error:', err);
        // navigate('/');
      }).finally(() => {
        navigate('/');
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="logout-card">
      <h2>Are you Logging out?</h2>
      <div className="logout-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
