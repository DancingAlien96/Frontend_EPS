'use client';

import { Sparkles, Palette, BookOpen, Download, Lightbulb, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FortaleceTuMarcaPage() {
  const secciones = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Identidad Básica',
      description: 'Define el nombre, logo y colores que representan tu marca',
      items: ['Nombre comercial', 'Diseño de logo', 'Paleta de colores', 'Tipografía']
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Storytelling',
      description: 'Cuenta la historia de tu emprendimiento de forma auténtica',
      items: ['Tu historia', 'Misión y visión', 'Valores', 'Propuesta de valor']
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Manuales y Guías',
      description: 'Aprende paso a paso cómo construir tu marca',
      items: ['Guía de marca', 'Manual de identidad', 'Plantillas listas', 'Ejemplos prácticos']
    }
  ];

  const plantillas = [
    { nombre: 'Logo Simple', formato: 'AI/PSD' },
    { nombre: 'Plantilla Social Media', formato: 'Canva' },
    { nombre: 'Tarjetas de Presentación', formato: 'PDF' },
    { nombre: 'Manual de Marca', formato: 'DOCX' }
  ];

  const ejemplosLocales = [
    { nombre: 'Café Don Pedro', sector: 'Alimentos', logro: 'Exporta a 5 países' },
    { nombre: 'Artesanías Maya', sector: 'Artesanías', logro: 'Presencia en ferias internacionales' },
    { nombre: 'TechLocal', sector: 'Tecnología', logro: 'App con 10k descargas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Fortalece tu Marca
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Construye una Marca Memorable
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ordena tu identidad y destaca en el mercado con una marca sólida y profesional
          </p>
        </motion.div>

        {/* Secciones principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {secciones.map((seccion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                {seccion.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{seccion.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{seccion.description}</p>
              <ul className="space-y-2">
                {seccion.items.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Plantillas descargables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 mb-12 text-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Plantillas Descargables</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plantillas.map((plantilla, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <Download className="w-5 h-5" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{plantilla.formato}</span>
                </div>
                <p className="font-semibold">{plantilla.nombre}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ejemplos locales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            Marcas Locales de Éxito
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {ejemplosLocales.map((ejemplo, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4"></div>
                <h3 className="font-bold text-gray-900 mb-1">{ejemplo.nombre}</h3>
                <p className="text-sm text-purple-600 mb-3">{ejemplo.sector}</p>
                <p className="text-sm text-gray-600">✨ {ejemplo.logro}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-purple-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
