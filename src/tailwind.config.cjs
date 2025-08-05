/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A1A27',     // Main background
        'accent-glow': '#101E2B',    // Glow effects
        'glow-blue': '#0C1C2B',      // Jellyfish glow
        'text-primary': '#D8DADC',   // Main text
        'text-glow': '#FFFFFF',      // Bright highlights
      },
    },
  },
  plugins: [],
};
