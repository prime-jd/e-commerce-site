// src/components/ProductCard.jsx
import React from 'react';
import '../css/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <div className="rating">
          <span>Rating: {product.rating.rate}</span>
          <span>({product.rating.count} reviews)</span>
        </div>
        <button className="add-to-cart" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
