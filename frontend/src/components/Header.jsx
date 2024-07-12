import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import '../css/Header.css';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { setStatus, status } = useContext(UserContext);
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log(status);
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle the search functionality here
    console.log('Searching for:', searchQuery);
    // Navigate to a search results page or filter the products based on searchQuery
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <img src="https://cdn.simpleicons.org/e/white" alt="Logo" className="logo-image" />
          <a href="/" className="logo-link">
            Shop with Us
          </a>
        </h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        <nav className="nav-links">
          {status ? (
            <Link className="nav-button" to='/logout'>Logout</Link>
          ) : (
            <Link className="nav-button" to='/login'>Login</Link>
          )}
          <Link className="nav-button signup" to='/signup'>Sign Up</Link>
          {status && <Link className="nav-button" to='/cart'>Cart</Link>}
          <Link className="nav-button" to='/'>Items</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
