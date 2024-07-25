// src/components/ProductDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductDetailPage.css';
import UserContext from '../context/UserContext';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // New state for rating
  const [feedback, setFeedback] = useState(''); // New state for feedback text
  const [feedbackList, setFeedbackList] = useState([]); // New state for storing feedback list
  const navigate = useNavigate();
  let info = localStorage.getItem('info');
  let user = localStorage.getItem('user');

  const { status } = useContext(UserContext);

  useEffect(() => {
    const info1 = JSON.parse(info);
    setProduct(info1);
    fetchFeedback(info1.id); // Fetch feedback when the component mounts
  }, [info]);

  const fetchFeedback = async (productId) => {
    try {
      const response = await fetch('/api/v1/user/getfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error(`Error fetching feedback: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      setFeedbackList(data.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('/api/v1/user/addtocart', {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity:quantity,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage('');
      }, 2000); // Clear message after 2 seconds
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleSubmitFeedback = async () => {

    try {
      const response = await axios.post('/api/v1/user/feedback', {
        user,
        productId: product.id,
        rating: rating,
        feedback: feedback,
      });
      console.log('Feedback submitted:', response.data);
      setMessage(response.data.message);
      setFeedback('');
      setRating(0);
      fetchFeedback(product.id); // Fetch the updated feedback list
      setTimeout(() => {
        setMessage('');
      }, 2000); // Clear message after 2 seconds
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleBuy = ()=>{
    const info1 = JSON.parse(info);
    localStorage.setItem('buy', JSON.stringify(info1))
    navigate('/buy');
  }

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
        {message && <div className="message">{message}</div>}
        <div className="button-group">
          {status && (
            <>
              <button onClick={handleBuy} className="buy-product">Buy Product</button>
              <button className="additional-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </>
          )}
          {!status && <p style={{ color: 'red' }}>Please login first</p>}
        </div>
        {status && <div className="rating-feedback">
          {product.rating && (
            <>
              <h3>
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </h3>
              <div className="feedback-section">
                <h3>Feedback</h3>
                <StarRating rating={rating} setRating={setRating} />
                <textarea
                  placeholder="Write your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button className="submit-feedback" onClick={handleSubmitFeedback}>
                  Submit
                </button>
              </div>
              <div className="feedback-list">
                {feedbackList?.map((fb, index) => (
                  <div key={index} className="feedback-item">
                    <div className="feedback-rating">
                      <img style={{height:"40px",width: "40px"}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png'/>
                      <h3>{fb.user}</h3>
                      <StarRating rating={fb.rating} readOnly />
                    </div>
                    <p>{fb.feedback}</p>
                    <p className="feedback-username">- {fb.username}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>}
      </div>
    </div>
  );
};

export default ProductDetails;
