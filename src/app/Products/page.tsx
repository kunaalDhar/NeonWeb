'use client';
import React, { useState } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiEye } from 'react-icons/fi';
import { useCart } from '../components/CartContext';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Mystic Moonstone Pendant',
    price: 120,
    originalPrice: 150,
    image: '/assets/jewel1.png',
    rating: 4.8,
    reviewCount: 42,
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Enchanted Emerald Ring',
    price: 95,
    image: '/assets/jewel2.png',
    rating: 4.5,
    reviewCount: 28,
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Celestial Sapphire Earrings',
    price: 150,
    image: '/assets/jewel3.png',
    rating: 4.9,
    reviewCount: 56,
    isNew: true
  },
  {
    id: '4',
    name: 'Golden Sunburst Bracelet',
    price: 85,
    originalPrice: 110,
    image: '/assets/jewel4.png',
    rating: 4.3,
    reviewCount: 19
  },
  {
    id: '5',
    name: 'Silver Twilight Necklace',
    price: 135,
    image: '/assets/jewel5.png',
    rating: 4.7,
    reviewCount: 37
  },
  {
    id: '6',
    name: 'Diamond Infinity Band',
    price: 220,
    originalPrice: 250,
    image: '/assets/jewel6.png',
    rating: 5.0,
    reviewCount: 64,
    isBestSeller: true
  },
];

const ProductsPage = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { cart, addToCart } = useCart();

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-400 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-lg">
          Our Jewelry Collection
        </h2>
        <p className="text-center text-cyan-100 mb-12 max-w-2xl mx-auto">
          Discover handcrafted elegance with our premium collection. Each piece is designed to tell a story.
        </p>
        
        <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {demoProducts.map((product) => (
            <Link key={product.id} href={`/Products/${product.id}`} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 relative block p-2 sm:p-0">
              {/* Badges */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-2 z-10">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    BESTSELLER
                  </span>
                )}
              </div>
              
              {/* Wishlist button */}
              <button
                onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
                className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full z-10 transition-colors ${
                  wishlist.includes(product.id) 
                    ? 'text-red-500 bg-white/90 shadow-md' 
                    : 'text-gray-500 bg-white/70 hover:bg-white/90'
                }`}
              >
                <FiHeart 
                  className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} 
                />
              </button>
              
              {/* Product image */}
              <div className="relative h-40 sm:h-64 overflow-hidden bg-gradient-to-br from-cyan-50 to-cyan-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-2 sm:p-6 transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="flex items-center gap-2 text-white bg-cyan-600 hover:bg-cyan-700 px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-all text-xs sm:text-sm" onClick={e => e.preventDefault()}>
                    <FiEye className="w-4 h-4" />
                    <span className="font-medium">Quick View</span>
                  </button>
                </div>
              </div>
              
              {/* Product details */}
              <div className="p-2 sm:p-6">
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                    {product.name}
                  </h3>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-amber-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                  <span className="text-lg sm:text-xl font-bold text-cyan-700">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Add to cart button */}
                <button
                  className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base ${cart.find((c) => c.id === product.id) ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={e => { e.preventDefault(); addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }); }}
                  disabled={!!cart.find((c) => c.id === product.id)}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>{cart.find((c) => c.id === product.id) ? 'Added' : 'Add to Cart'}</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;