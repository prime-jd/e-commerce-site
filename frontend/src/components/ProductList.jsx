import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import '../css/ProductList.css';
import UserContext from '../context/UserContext.js';
import Loading from './Loading.jsx';

const ProductList = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    price: '',
    rating: '',
  });

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('info')));
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

  const handleFilterChange = (e) => {
    setFilter({...filter, [e.target.name]: e.target.value });
  };

  const filteredProducts = products?.filter((product) => {
    if (filter.category && product.category!== filter.category) return false;
    if (filter.price && product.price > filter.price) return false;
    if (filter.rating && product.rating.rate < filter.rating) return false;
    return true;
  }) ?? [];

  if (loading) {
    return <Loading prop={error}/>;
  }

 

  return (
    <div className="product-list">
      <div className="filter-options">
        <h2>Filter Options</h2>
        <form>
          <label>
            Category:
            <select name="category" value={filter.category} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
            </select>
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={filter.price}
              onChange={handleFilterChange}
              placeholder="Max price"
            />
          </label>
          <br />
          <label>
            Rating:
            <select name="rating" value={filter.rating} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="4">4 and above</option>
              <option value="3">3 and above</option>
              <option value="2">2 and above</option>
            </select>
          </label>
        </form>
      </div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <ProductCard productId={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;