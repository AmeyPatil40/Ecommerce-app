import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import emptyCartImg from "../assests/th.jpeg";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    setShowConfirm(false);
    setItemToRemove(null);
  };

  const handleConfirm = (item) => {
    setItemToRemove(item);
    setShowConfirm(true);
  };

  const handleQuantityChange = (e, itemId) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); // Minimum quantity is 1
    updateQuantity(itemId, value);
  };

  return (
    <div className="container mx-auto py-8 px-4 lg:px-10 lg:py-8 border-2 border-gray-300 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            className="w-24 h-24 md:w-48 md:h-48 object-contain"
          />
          <p className="text-gray-600 mt-4 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left text-xs md:text-sm">
                  Product
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs md:text-sm">
                  Price
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs md:text-sm">
                  Quantity
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs md:text-sm">
                  Total
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs md:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.id)}
                      min="1"
                      className="w-20 p-1 border border-gray-300 rounded-md text-xs md:text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs md:text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm">
                    <button
                      onClick={() => handleConfirm(item)}
                      className="text-red-600 hover:text-red-500 text-lg md:text-xl"
                      aria-label="Remove Item"
                    >
                      🗑️ {/* Delete symbol */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right text-lg font-bold">
            <h2>Total Price: ${calculateTotal()}</h2>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">Confirm Removal</h3>
            <p className="text-sm">
              Are you sure you want to remove "{itemToRemove.title}" from the
              cart?
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <button
                onClick={() => handleRemove(itemToRemove.id)}
                className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition-colors text-sm"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition-colors text-sm"
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

export default CartPage;
