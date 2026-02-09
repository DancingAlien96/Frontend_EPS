import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores oficiales del gobierno de Guatemala
        'official-blue': '#003d7a',
        'secondary-blue': '#007bff',
        'light-blue': '#e7f1ff',
        'dark-gray': '#343a40',
        'light-gray': '#f8f9fa',
        'gray-text': '#6c757d',
        'border-color': '#dee2e6',
        'success-green': '#28a745',
        'warning-orange': '#ffc107',
      },
      boxShadow: {
        'elegant': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
        'elegant-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'elegant-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
        'elegant-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'card': '0 2px 8px rgba(0, 61, 122, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 61, 122, 0.12)',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
