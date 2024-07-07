import React, { useContext, useEffect, useState } from 'react';
import '../css/ProductList.css';
import Cart from './Cart';
import UserContext from '../context/UserContext';

const ProductList = () => {
  const { status } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/v1/user/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    if(status){
    fetch('/api/v1/user/addtocart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => setMessage(''), 1000); // Clear message after 1 second
      })
      .catch((err) => console.log(err));
    }
    else{
      setMessage("Please Login to add to cart");
    }
  };

  return (
    <>
      <h1>Shopping Items</h1><hr></hr>
      {message && <p className="message">{message}</p>}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.product}
              className="product-image"
              width="50"
              height="50"
            />
            <div className="product-info">
              <h2>{product.product}</h2>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
