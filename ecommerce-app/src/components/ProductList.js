import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-lg shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4"/>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-blue-500 font-bold">${product.price}</p>
          <Link to={`/product/${product.id}`} className="mt-2 inline-block text-indigo-600">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
