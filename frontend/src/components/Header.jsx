
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState ,useEffect} from 'react';
import '../css/Header.css';
import UserContext from '../context/UserContext';
import Logout from './Logout.jsx';
import { Link } from 'react-router-dom';

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
          {status? <Link className="nav-button" to='/logout'>Logout </Link> :<Link className="nav-button" to= '/login'>Login </Link>}
          <Link className="nav-button signup" to ='/signup'>Sign Up</Link>
          {status && <Link className="nav-button" to='/cart'>{isCart && `Items`}Cart</Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
