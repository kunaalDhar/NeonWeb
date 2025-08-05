"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function JellyfishOverlay() {
  useEffect(() => {
    const jellyfishes = [
      { selector: ".jelly-right-1", duration: 4 + Math.random() * 2, delay: Math.random() * 2 },
      { selector: ".jelly-right-2", duration: 5 + Math.random() * 2, delay: Math.random() * 3 },
      { selector: ".jelly-left-1", duration: 6 + Math.random() * 2, delay: Math.random() * 4 },
      { selector: ".jelly-left-2", duration: 4 + Math.random() * 2, delay: Math.random() * 5 }
    ];

    jellyfishes.forEach((fish) => {
      gsap.to(fish.selector, {
        y: () => gsap.utils.random(-30, 30),
        x: () => gsap.utils.random(-10, 10),
        duration: fish.duration,
        repeat: -1,
        yoyo: true,
        delay: fish.delay,
        ease: "sine.inOut",
        scale: () => gsap.utils.random(0.8, 1.2),
        rotation: () => gsap.utils.random(-5, 5),
        opacity: () => gsap.utils.random(0.3, 0.9),
      });
    });
  }, []);

  return (
    <div className="pointer-events-none z-50 fixed inset-0 px-2 md:px-6">
      {/* Right Side Jellyfish */}
      <div className="fixed bottom-4 right-2 md:bottom-10 md:right-10">
        <img
          src="/assets/jelly-fish.png"
          alt="Jellyfish"
          className="w-16 md:w-28 jelly-right-1"
        />
      </div>
      <div className="fixed bottom-24 right-6 md:bottom-40 md:right-20">
        <img
          src="/assets/jelly-fish.png"
          alt="Jellyfish"
          className="w-16 md:w-28 jelly-right-2"
        />
      </div>

      {/* Left Side Jellyfish */}
      <div className="fixed bottom-10 left-2 md:bottom-20 md:left-10">
        <img
          src="/assets/jelly-fish.png"
          alt="Jellyfish"
          className="w-16 md:w-28 jelly-left-1"
        />
      </div>
      <div className="fixed bottom-24 left-6 md:bottom-40 md:left-24">
        <img
          src="/assets/jelly-fish.png"
          alt="Jellyfish"
          className="w-16 md:w-28 jelly-left-2"
        />
      </div>
    </div>
  );
}