import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import '../css/Header.css';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [hide, setHide] = useState(true);
  const [showSearchResults, setShowSearchResults]= useState(false);
  const { setStatus, status,setInfo } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const debounceSearch = (query) => {
      if(searchQuery===''){
        setSearchResults([])
      }
      const delay = 300; // Adjust delay as needed

      const timeoutId = setTimeout(() => {
        fetch('https://fakestoreapi.com/products')
          .then(response => response.json())
          .then(data => {
            const filteredProducts = data.filter(product =>
              product.title.toLowerCase().includes(query)
            );
            setSearchResults(filteredProducts);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            // Handle error, e.g., display an error message
          });
      }
      , delay);

      return () => clearTimeout(timeoutId);
    };
    debounceSearch(query);
  };

  const handleProductClick = (product,productId,title) => {
    setInfo(product)
    localStorage.setItem('info', JSON.stringify(product));
    setSearchResults([])
    setSearchQuery(title)
    navigate(`/product/${productId}`);
  };

  const handleInputFocus = () => {
    setHide(true)
  };

  const handleInputBlur = () => {
    setHide(false)
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      if(searchQuery===''){
        setSearchResults([])
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <img src="https://cdn.simpleicons.org/e/white" alt="Logo" className="logo-image" />
          <a href="/" className="logo-link">
            Shop with Us
          </a>
        </h1>

        <form className="search-form">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          
            placeholder="Search for products..."
          />
          {/* <button className="search-button" type="submit">
            Search
          </button> */}
          { searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(product => (
                <div style={{color: 'black'}} key={product.id} className="search-result-item">
                  <Link style={{textDecoration:'none',color: 'black'}} to={`/product/${product.id}`} onClick={() => handleProductClick(product, product.id,product.title)}>
                   {product.title} 
                  </Link>
                </div>
              ))}
            </div>
          )}
        </form>

        <nav className="nav-links">
          {status ? 
             <Link className="nav-button" to='/logout'>Logout</Link>
            : 
             <Link className="nav-button" to='/login'>Login</Link>}
           {!status && <Link className="nav-button signup" to='/signup'>Sign Up</Link>}
           {status && <Link className="nav-button" to='/cart'>Cart</Link>}
           <Link className="nav-button" to='/'>Items</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;