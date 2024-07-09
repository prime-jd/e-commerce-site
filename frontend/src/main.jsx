// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import './index.css'
// import Login from './components/Login.jsx'
// import Cart from './components/Cart.jsx'
// import {RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom'
// import ProductList from './components/ProductList.jsx'

// const router = createBrowserRouter(createRoutesFromElements(
//   <Route path='/' element={<ProductList/>}>
//     <Route path='login' element={<Login/>}/>
//     <Route path='cart' element={<Cart/>}/>
//   </Route>)
//   );

// ReactDOM.createRoot(document.getElementById('root')).render(
//    <RouterProvider router={router}/>
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UseContextProvider from './context/UseContextProvider';
import './index.css';
import Layout from './Layout.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <UseContextProvider >    
        <App />
    </UseContextProvider>
  </React.StrictMode>,
  
);
