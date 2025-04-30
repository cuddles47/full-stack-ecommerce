"use client";
import React from 'react';
import { useCart } from '../hooks/useCart';

const Warning = () => {
  const { items, isVisible, onToggle } = useCart();
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
        {items.length ? (
          <ul className="space-y-2 mb-4">
            {items.map(item => (
              <li key={item.productId} className="flex justify-between">
                <span>{item.productName}</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">Your cart is empty.</p>
        )}
        <button
          onClick={() => onToggle(false)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Warning;