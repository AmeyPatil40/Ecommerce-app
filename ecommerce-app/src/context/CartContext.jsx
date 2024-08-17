import React, { createContext, useState, useContext } from "react";

// Create a Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        // Update quantity if the product already exists
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new product to the cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  // Function to get the total quantity of items in the cart
  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Provide cart state and actions to components
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use Cart Context
export const useCart = () => useContext(CartContext);
