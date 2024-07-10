// src/components/ProductDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductDetailPage.css';
import UserContext from '../context/UserContext';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  let info = localStorage.getItem('info');
  const {status} = useContext(UserContext);


  useEffect(() => {
    console.log(status);
    const info1 = JSON.parse(info);
    setProduct(info1);
  }, [info]);

  const handleAddToCart = async () => {

    try {
      const response = await axios.post('/api/v1/user/addtocart', {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity,
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="product-details-container">
      {product.image && <img src={product.image} alt={product.title} />}
      <div className="product-details-product">
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
        <p>Please Login first</p>
        { <div className="button-group">
           {status &&<button className="buy-product">Buy Product</button>}
          {status && <button className="additional-button" onClick={handleAddToCart}>
            Add to Cart
          </button>}
          <p style={{color : "red"}}> Please Login first</p>
        </div>}
        <div className="rating-feedback">
          {product.rating && (
            <>
              <h3>
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </h3>
              <div className="feedback-section">
                <h3>Feedback</h3>
                <textarea placeholder="Write your feedback"></textarea>
                <button className="submit-feedback">Submit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
