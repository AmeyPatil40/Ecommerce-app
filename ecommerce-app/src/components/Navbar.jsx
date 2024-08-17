import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import the Cart Context

const Navbar = () => {
  const { getCartQuantity } = useCart(); // Use the updated function name

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-white p-4 fixed top-0 w-full z-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-semibold hover:text-gray-200 transition-colors"
        >
          MyStore
        </Link>
        <div className="mr-2">
          <Link
            to="/cart"
            className="relative flex items-center text-lg hover:text-gray-200 transition-colors"
          >
            Cart
            {/* Show item count */}
            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
              {getCartQuantity() }
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
