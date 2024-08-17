import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://json-server-de5k.onrender.com/products"
      );
      setProducts(res.data);
      setAllProducts(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Throttle function to limit the frequency of scroll event handling
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setProducts((prevProducts) => [...prevProducts, ...allProducts]);
      }
    }, 200),
    [allProducts]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`} // Unique key for repeated products
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h2>
            </div>
            <div className="mt-auto flex gap-2">
              <Link
                to={`/product/${product.id}`}
                className="inline-block bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-500 transition-colors text-sm"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="inline-block bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-500 transition-colors text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Select Quantity for {selectedProduct.title}
            </h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value, 10)))
              }
              min="1"
              className="border p-2 rounded-md w-20 text-center"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleConfirmAddToCart}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
