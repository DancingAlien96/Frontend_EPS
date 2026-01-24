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
    },
  },
  plugins: [],
} satisfies Config;
