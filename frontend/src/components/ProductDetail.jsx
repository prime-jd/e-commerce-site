// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../css/ProductDetailPage.css';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [color, setColor] = useState('');
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleSubmitReview = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(`https://fakestoreapi.com/products/${id}/reviews`, {
//         rating,
//         review,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="product-detail-page">
//       <div className="product-image">
//         <img src={product.image} alt={product.title} />
//       </div>
//       <div className="product-info">
//         <h2>{product.title}</h2>
//         <p>{product.description}</p>
//         <p className="price">${product.price}</p>
//         <p className="category">{product.category}</p>
//         <div className="rating">
//           <span>Rating: {product.rating.rate}</span>
//           <span>({product.rating.count} reviews)</span>
//         </div>
//         <div className="actions">
//           <button className="add-to-cart" onClick={() => console.log('Add to cart')}>
//             Add to Cart
//           </button>
//           <button className="buy-now" onClick={() => console.log('Buy now')}>
//             Buy Now
//           </button>
//         </div>
//         <div className="quantity">
//           <label>Quantity:</label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={(event) => setQuantity(event.target.value)}
//           />
//         </div>
//         <div className="color-options">
//           <label>Color:</label>
//           <select value={color} onChange={(event) => setColor(event.target.value)}>
//             <option value="">Select a color</option>
//             <option value="red">Red</option>
//             <option value="blue">Blue</option>
//             <option value="green">Green</option>
//           </select>
//         </div>
//         <div className="address">
//           <label>Address:</label>
//           <textarea value={address} onChange={(event) => setAddress(event.target.value)} />
//         </div>
//       </div>
//       <div className="reviews">
//         <h3>Reviews</h3>
//         <ul>
//           {product.reviews.map((review) => (
//             <li key={review.id}>
//               <p>{review.review}</p>
//               <p>Rating: {review.rating}</p>
//             </li>
//           ))}
//         </ul>
//         <form onSubmit={handleSubmitReview}>
//           <label>Rating:</label>
//           <input
//             type="number"
//             value={rating}
//             onChange={(event) => setRating(event.target.value)}
//           />
//           <label>Review:</label>
//           <textarea value={review} onChange={(event) => setReview(event.target.value)} />
//           <button type="submit">Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;