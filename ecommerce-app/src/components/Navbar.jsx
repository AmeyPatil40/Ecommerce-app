import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">
          MyStore
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/cart" className="hover:text-gray-200">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
