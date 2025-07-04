/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'apple-bg': '#f5f5f7', // Light grey background used in Apple product pages
        'apple-text': '#1d1d1f', // Near-black text color from Apple design
        'apple-blue': '#007aff', // Apple's system blue
        'apple-blue-light': '#5ac8fa', // Lighter blue for gradients
        'apple-gray': '#8e8e93', // Apple's secondary gray text
        'apple-gray-light': '#f2f2f7', // Very light gray for subtle backgrounds
        'apple-accent': '#007aff', // Primary accent color
      },
    },
  },
  plugins: [],
};
