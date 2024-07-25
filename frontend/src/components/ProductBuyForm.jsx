// ProductBuyDetailsForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProductBuyForm.css'
import UserContext from '../context/UserContext';

const ProductBuyDetailsForm = () => {
  const [itemDetails, setItemDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const buy = localStorage.getItem('buy');  

  useEffect(() => {
    console.log(buy);
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    const buy1 = JSON.parse(buy)
    setItemDetails(buy1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit form data to server
  };

  return (
    <div className="product-buy-details-form">
      <div className="item-details">
      <h1><u>Buy Product</u></h1>
        <img src={itemDetails.image} alt={itemDetails.product || itemDetails.title} />
        <h2>{itemDetails.product || itemDetails.title}</h2>
        <p>Price: <span style={{color: 'green'}}>$ {itemDetails.price * quantity}</span></p>
        <p>Quantity: {quantity}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={handleQuantityChange} />
        <br />
        <label>Delivery Address:</label>
        <textarea value={deliveryAddress} onChange={handleDeliveryAddressChange} />
        <br />
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="">Select payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
        <br />
        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
};

export default ProductBuyDetailsForm;