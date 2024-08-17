import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify"; // Import toast

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://json-server-de5k.onrender.com/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product data", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handlePrevImage = () => {
    setCurrentImage((prev) =>
      prev > 0 ? prev - 1 : product.images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev < product.images.length - 1 ? prev + 1 : 0
    );
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      toast.success(`${product.title} added to cart!`); // Display success toast
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 border-2 border-gray-300 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Product Image with Carousel */}
        <div className="relative flex-1 flex justify-center items-center">
          <div className="relative w-full max-w-md h-96">
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
              aria-label="Previous Image"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
              aria-label="Next Image"
            >
              &gt;
            </button>
          </div>
        </div>
        {/* Image Gallery and Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Image Gallery */}
          <div className="relative p-2">
            <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} image ${index + 1}`}
                  className={`w-24 h-24 m-2 object-cover rounded-md cursor-pointer transition-transform transform ${
                    index === currentImage
                      ? "border-2 border-blue-500 scale-110"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
          {/* Product Info */}
          <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-gray-300">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl text-blue-600 mb-4">${product.price}</p>
            <p className="text-gray-800 mb-4">{product.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="0"
                className="w-16 p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddToCart}
                className={`bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-500 transition-colors ${
                  quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={quantity <= 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
