import React, { useEffect, useState, useContext } from 'react';
import '../css/Cart.css';
import UserContext from '../context/UserContext.js'

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { status } = useContext(UserContext);
  useEffect(() => {
    fetch('/api/v1/user/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      })
      .catch((err) => console.log(err));
  }, [setCart,status]);

  const removeFromCart = (id) => {
    fetch(`/api/v1/user/cartremove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      })
      .catch((err) => console.log(err));
  };

  const buyProduct = (product) => {
    // Add logic to handle buying the product
    console.log(`Buying product: ${product.product}`);
  };

  return (
    <>
    <h1>Please Login first</h1>
    {status && <div className="cart">
      <h1 style={{textAlign:'center'}}><img style={{height:"40px",width:"40px"}} src='https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA='/>Shopping Cart</h1><hr></hr>
      {cart.length === 0 ? (
        <p className='aligntext'>Your cart is empty</p>
      ) : (
        cart.map((product) => (
          <div key={product.id} className="cart-item">
            <div className="cart-item-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="cart-item-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
            <div className="cart-item-buttons">
              <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
              <button className="buy-button" onClick={() => buyProduct(product)}>Buy</button>
            </div>
          </div>
        ))
      )}
    </div>}
    </>
  );
};

export default Cart;
