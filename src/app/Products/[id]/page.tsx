"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../components/CartContext';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

const demoProducts = [
  {
    id: '1',
    name: 'Mystic Moonstone Pendant',
    price: 120,
    originalPrice: 150,
    image: '/assets/jewel1.png',
    rating: 4.8,
    reviewCount: 42,
    description: 'A mystical pendant crafted from moonstone, said to bring calm and balance.',
  },
  {
    id: '2',
    name: 'Enchanted Emerald Ring',
    price: 95,
    image: '/assets/jewel2.png',
    rating: 4.5,
    reviewCount: 28,
    description: 'A ring with a vibrant emerald, perfect for those who love nature.',
  },
  {
    id: '3',
    name: 'Celestial Sapphire Earrings',
    price: 150,
    image: '/assets/jewel3.png',
    rating: 4.9,
    reviewCount: 56,
    description: 'Earrings that sparkle like the night sky, featuring celestial sapphires.',
  },
  // Add more as needed
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const product = demoProducts.find((p) => p.id === id);

  if (!product) {
    return <div className="text-center text-cyan-900 py-20">Product not found.</div>;
  }

  const inCart = !!cart.find((c) => c.id === product.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400 py-16 px-4 flex justify-center items-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 max-w-4xl w-full border-2 border-cyan-200">
        <img src={product.image} alt={product.name} className="w-64 h-64 object-contain rounded-xl border-4 border-cyan-300 shadow mx-auto" />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyan-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-cyan-700">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
          <button
            className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${inCart ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
            disabled={inCart}
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 