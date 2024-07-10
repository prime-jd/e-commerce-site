// src/components/ProductCard.jsx
import React, {useContext, useEffect} from 'react';
import '../css/ProductCard.css';
import UserContext from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {info, setInfo} = useContext(UserContext);

   const handleAddToCart = ()=>{
    setInfo(product);
    localStorage.setItem('info', JSON.stringify(info));
    navigate("/cart");
   }

   useEffect(() => {
    localStorage.setItem('info', JSON.stringify(info));
  }, []);

  return (
    <div className="product-card">
      <img style={{height : '400px', width: 'full'}} src={product.image} alt={product.title} />
      <div className="product-details">
        <h2>{product.title}</h2>
        {/* <p>{product.description}</p> */}
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <div className="rating">
          <span>Rating: {product.rating.rate}</span>
          <span>({product.rating.count} reviews)</span>
        </div>
        <div className="buttons">
          <button className="add-to-cart" onClick={(e) => handleAddToCart(product)}>
            View product..
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;