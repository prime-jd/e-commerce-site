// import React, { useContext, useEffect, useState } from 'react';
// import '../css/ProductList.css';
// import Cart from './Cart';
// import UserContext from '../context/UserContext';

// const ProductList = () => {
//   const { status } = useContext(UserContext);
//   const [message, setMessage] = useState('');
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('/api/v1/user/products', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const addToCart = (product) => {
//     if(status){
//     fetch('/api/v1/user/addtocart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(product),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setMessage(data.message);
//         setTimeout(() => setMessage(''), 1000); // Clear message after 1 second
//       })
//       .catch((err) => console.log(err));
//     }
//     else{
//       setMessage("Please Login to add to cart");
//     }
//   };

//   return (
//     <>
//       <h1>Shopping Items</h1><hr></hr>
//       {message && <p className="message">{message}</p>}
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <img
//               src={product.image}
//               alt={product.product}
//               className="product-image"
//               width="50"
//               height="50"
//             />
//             <div className="product-info">
//               <h2>{product.product}</h2>
//               <p>${product.price}</p>
//               <button onClick={() => addToCart(product)}>Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ProductList;


// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import '../css/ProductCard.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
