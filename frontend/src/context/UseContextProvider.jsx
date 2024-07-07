import React, { useEffect } from 'react';
import UserContext from './UserContext';

const UseContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : '';
  });

  const [status, setStatus] = React.useState(() => {
    const savedStatus = localStorage.getItem('status');
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status));
  }, [status]);

  return (
    <UserContext.Provider value={{ user, setUser, status, setStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UseContextProvider;
