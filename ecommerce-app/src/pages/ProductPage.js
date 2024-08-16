import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((currentImage + 1) % product.images.length);
  const prevImage = () => setCurrentImage((currentImage - 1 + product.images.length) % product.images.length);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0">
          <img src={product.images[currentImage]} alt={product.name} className="w-full h-64 object-cover mb-4"/>
          <button onClick={prevImage}>Previous</button>
          <button onClick={nextImage}>Next</button>
        </div>
        <div className="ml-0 md:ml-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-blue-500 font-bold">${product.price}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
