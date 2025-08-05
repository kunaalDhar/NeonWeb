// components/HeroSection/HeroSection.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'


export default function HeroSection() {
  const router = useRouter();
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleShopNow = () => {
    if (bubbleRef.current) {
      bubbleRef.current.classList.add('animate-bubble');
      setTimeout(() => {
        router.push('/Products');
      }, 1200); // Duration matches animation
    } else {
      router.push('/Products');
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
     
      <div className="z-10 text-center px-4 bg-black/10 backdrop-blur-sm p-6 rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4">
          Discover Enchanted Elegance
        </h1>
        <p className="text-[#D8DADC] text-lg">Mystic jewelry handcrafted from fantasy forests</p>
        <button
          onClick={handleShopNow}
          className="mt-6 px-8 py-3 bg-cyan-400 text-black font-semibold rounded-full shadow-lg hover:bg-cyan-300 transition relative z-20"
        >
          Shop Now
        </button>
        <button  
          onClick={() => router.push('/login')}
          className="mt-6  ml-2 px-8 py-3 bg-cyan-400 text-black font-semibold rounded-full shadow-lg hover:bg-cyan-300 transition relative z-20"
        >
         Login
        </button>
      </div>
      
     
    </section>
    
  )
}
