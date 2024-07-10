// src/components/ProductDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import '../css/ProductDetailPage.css';
import UserContext from '../context/UserContext';

const ProductDetails = () => {
    const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const info = localStorage.getItem('info');

  useEffect(()=>{
    console.log(info)
    if(product)
        setProduct(info);
  },[])

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.title} />
      <div className="product-details-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <div className="quantity-select">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button className="buy-product">Buy Product</button>
        <div className="rating-feedback">
          <h3>Rating: {product.rating.rate} ({product.rating.count} reviews)</h3>
          <div className="feedback-section">
            <h3>Feedback</h3>
            <textarea placeholder="Write your feedback"></textarea>
            <button className="submit-feedback">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
