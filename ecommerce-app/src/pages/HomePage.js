import React from 'react';
import ProductList from '../components/ProductList';
import { products } from '../data/products'; // You'll create a sample products data file.

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
