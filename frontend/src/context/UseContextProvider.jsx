import React, { useEffect } from 'react';
import UserContext from './UserContext';

const UseContextProvider = ({ children }) => {
    const [info, setInfo]= React.useState(()=>{
      const savedInfo = localStorage.getItem('info')
        return savedInfo ? JSON.parse(savedInfo): {}
      
} );
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : '';
  });

  const [status, setStatus] = React.useState(() => {
    const savedStatus = localStorage.getItem('status');
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  const [buy, setBuy] = React.useState(() => {
    const savedBuy = localStorage.getItem('buy');
    return savedBuy ? JSON.parse(savedBuy) : '';
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status));
  }, [status]);

  useEffect(() => {
    localStorage.setItem('info', JSON.stringify(info));
  }, [info]);

  useEffect(() => {
    localStorage.setItem('buy', JSON.stringify(buy));
  }, [buy]);

  return (
    <UserContext.Provider value={{ user, setUser, status, setStatus,info, setInfo, buy, setBuy}}>
      {children}
    </UserContext.Provider>
  );
};

export default UseContextProvider;
