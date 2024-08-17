import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product data', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-blue-500 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
