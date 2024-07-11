// src/App.jsx
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';
import Layout from './Layout.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Logout from './components/Logout.jsx';
import ProductDetails from './components/ProductDetail.jsx';
import SplashScreen from './components/SplashScreen.jsx';

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <Router>
      <div className="app">
      {showSplash ? <SplashScreen onFinish={handleSplashFinish} /> : 
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
}
      </div>
    </Router>
  );
};

export default App;
