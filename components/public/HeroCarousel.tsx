'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { id: 1, image: '/hero1.jpg', alt: 'Emprendedores 1' },
  { id: 2, image: '/hero2.jpg', alt: 'Emprendedores 2' },
  { id: 3, image: '/hero3.jpg', alt: 'Emprendedores 3' },
  { id: 4, image: '/hero4.jpg', alt: 'Emprendedores 4' },
  { id: 5, image: '/hero5.jpg', alt: 'Emprendedores 5' },
];

interface HeroCarouselProps {
  onOpenModal: () => void;
}

export default function HeroCarousel({ onOpenModal }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[calc(100vh-120px)] min-h-[600px] overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Carrusel de imágenes */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        </AnimatePresence>
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />

      {/* Contenido del Hero */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
        >
          ¡Impulsa tu Emprendimiento!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white bg-[#003d7a]/85 px-10 py-6 rounded-xl max-w-4xl mx-auto mb-8 drop-shadow-lg"
        >
          Sistema de apoyo dedicado al desarrollo empresarial en los 11 municipios
          de Chiquimula. Te ofrecemos capacitación, financiamiento y asesoría
          personalizada para hacer crecer tu negocio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={onOpenModal}
            className="px-8 py-4 bg-[#28a745] text-white rounded-lg font-semibold text-lg hover:bg-[#218838] transform hover:-translate-y-1 transition-all shadow-lg"
          >
            ✨ Registrarme como Emprendedor
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('programas');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-[#003d7a] transition-all"
          >
            📋 Ver Programas Disponibles
          </button>
        </motion.div>
      </div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
