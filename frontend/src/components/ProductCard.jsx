// src/components/ProductCard.jsx
import React, { useContext } from 'react';
import '../css/ProductCard.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { setInfo } = useContext(UserContext);

  const handleViewProduct = () => {
    setInfo(product);
    localStorage.setItem('info', JSON.stringify(product));
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <img style={{ height: '400px', width: 'full' }} src={product.image} alt={product.title} />
      <div className="product-details">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <div className="rating">
          <span>Rating: {product.rating.rate}</span>
          <span>({product.rating.count} reviews)</span>
        </div>
        <div className="buttons">
          <button className="add-to-cart" onClick={handleViewProduct}>
            View product..
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
