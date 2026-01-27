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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => setCurrentSlide((s) => (s + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[60vh] sm:h-[50vh] md:h-[70vh] min-h-[320px] md:min-h-[600px] overflow-hidden flex items-center justify-center bg-gray-900 pt-20 sm:pt-12 md:pt-0">
      {/* Carrusel de imágenes */}
      <div className="absolute inset-0 touch-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(_, info) => {
              setIsPaused(false);
              if (info.offset.x < -50) nextSlide();
              else if (info.offset.x > 50) prevSlide();
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />

      {/* Contenido del Hero */}
      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl"
        >
          ¡Impulsa tu Emprendimiento!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-sm sm:text-base md:text-xl text-white bg-[#003d7a]/95 sm:bg-[#003d7a]/90 px-4 sm:px-10 py-3 sm:py-6 rounded-xl max-w-3xl mx-auto mb-4 sm:mb-6 drop-shadow-lg leading-relaxed"
        >
          Sistema de apoyo dedicado al desarrollo empresarial en los 11 municipios
          de Chiquimula. Te ofrecemos capacitación, financiamiento y asesoría
          personalizada para hacer crecer tu negocio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto px-8 py-3 bg-[#28a745] text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-[#218838] transform hover:-translate-y-0.5 transition-all shadow-lg"
          >
            ✨ Registrarme como Emprendedor
          </button>
        </motion.div>
      </div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 touch-manipulation hidden sm:flex">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125 w-3.5 h-3.5' : 'bg-white/60 w-2.5 h-2.5'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
