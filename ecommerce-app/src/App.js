import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className='pt-16 px-4 lg:px-10 lg:py-8 mt-10'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
