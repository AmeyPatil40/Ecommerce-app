import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // Example state, update this based on your cart management logic.

  const updateCart = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between mb-4">
              <p>{item.name}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateCart(item.id, e.target.value)}
                className="border p-2 w-16"
              />
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
