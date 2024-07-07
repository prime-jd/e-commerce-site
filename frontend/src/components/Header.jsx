
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState ,useEffect} from 'react';
import '../css/Header.css';
import UserContext from '../context/UserContext';
import Logout from './Logout.jsx';

const Header = () => {
  const {setStatus, status}= useContext(UserContext)
  const [isCart, setisCart] = useState(() => {
    const savedStatus = localStorage.getItem('isCart');
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem('isCart', JSON.stringify(isCart));
    console.log(status)
  }, [isCart,status]);


  const navigate = useNavigate();
    const handleCart= ()=>{
        if(isCart==false){
            setisCart(true)
            navigate('/cart')
        }
        else{
            navigate('/')
            setisCart(false);    
        }
    }
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
            <img src="https://cdn.simpleicons.org/e/white" alt="Logo" className="logo-image" />
          <a href="/" className="logo-link">
            Shop with Us
          </a>
        </h1>
        <nav className="nav-links">
          {status? <button className="nav-button" onClick={() => window.location.href = '/logout'}>Logout </button> :<button className="nav-button" onClick={() => window.location.href = '/login'}>Login </button>}
          <button className="nav-button signup" onClick={() => window.location.href = '/signup'}>Sign Up</button>
          {status && <button className="nav-button" onClick={() => handleCart()}>{isCart && `Items`}Cart</button>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
