/**
 * UI Style Guide - Design System
 * Professional design system documentation for high-end Next.js projects
 */

export const colors = {
  // Primary Colors
  primary: {
    navy: '#0F172A',      // Midnight Navy - Main brand color
    gold: '#C5A659',      // Champagne Gold - Accent
    green: '#065F46',     // Emerald Green - Success/Highlight
  },
  
  // Neutral Colors
  neutral: {
    cream: '#F9F7F8',     // Cream White - Light background
    slate: '#F8F8F8',     // Slate Tint - Subtle background
    white: '#FFFFFF',     // Pure white
    black: '#000000',     // Pure black
  },
  
  // Semantic Colors (derived from palette)
  semantic: {
    success: '#065F46',   // Emerald Green
    warning: '#C5A659',   // Champagne Gold
    error: '#991B1B',     // Deep red (complementary)
    info: '#0F172A',      // Midnight Navy
  }
};

export const typography = {
  fonts: {
    heading: 'var(--font-playfair)',  // Playfair Display for headings
    body: 'Inter, sans-serif',        // Inter Sans for body text
  },
  
  sizes: {
    // Mobile-first responsive sizes
    h1: 'text-3xl sm:text-4xl md:text-5xl',
    h2: 'text-2xl sm:text-3xl md:text-4xl',
    h3: 'text-xl sm:text-2xl md:text-3xl',
    h4: 'text-lg sm:text-xl md:text-2xl',
    h5: 'text-base sm:text-lg md:text-xl',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
  },
  
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
};

export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',  // Fully rounded
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
};

export const animations = {
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'ease-in-out',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
};

// Tailwind CSS classes for common patterns
export const buttonStyles = {
  primary: `
    bg-[#0F172A] text-white 
    hover:bg-[#1e293b] 
    rounded-lg px-6 py-3 
    transition-all duration-300 
    shadow-md hover:shadow-lg
    font-medium
  `,
  secondary: `
    bg-white text-[#0F172A] 
    border-2 border-[#0F172A]
    hover:bg-[#F8F8F8] 
    rounded-lg px-6 py-3 
    transition-all duration-300
    font-medium
  `,
  accent: `
    bg-[#C5A659] text-white 
    hover:bg-[#b8994d] 
    rounded-lg px-6 py-3 
    transition-all duration-300 
    shadow-md hover:shadow-lg
    font-medium
  `,
};

export const cardStyles = {
  default: `
    bg-white 
    rounded-2xl 
    shadow-sm hover:shadow-md 
    transition-all duration-300
    border border-gray-100
  `,
  elevated: `
    bg-white 
    rounded-2xl 
    shadow-lg 
    transition-all duration-300
  `,
};
