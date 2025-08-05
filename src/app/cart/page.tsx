'use client';
import React from 'react';
import { useCart } from '../components/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400 py-16 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center border-2 border-cyan-200 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <>
            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400 mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
            </svg>
            <p className="text-cyan-800 text-lg text-center mb-4">Add some enchanted jewelry to your cart!</p>
          </>
        ) : (
          <>
            <ul className="w-full divide-y divide-cyan-100 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-full border-2 border-cyan-200" />
                  <div className="flex-1">
                    <div className="font-semibold text-cyan-800">{item.name}</div>
                    <div className="text-cyan-600 font-bold">${item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-cyan-200 text-cyan-800 rounded-full font-bold text-lg hover:bg-cyan-300 transition">-</button>
                    <span className="px-3 text-cyan-900 font-bold text-lg">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-cyan-200 text-cyan-800 rounded-full font-bold text-lg hover:bg-cyan-300 transition">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700 font-bold px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 transition">Remove</button>
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-cyan-700">Total:</span>
              <span className="text-2xl font-bold text-cyan-900">${total}</span>
            </div>
            <button className="mt-8 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-lg">Proceed to Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage; 