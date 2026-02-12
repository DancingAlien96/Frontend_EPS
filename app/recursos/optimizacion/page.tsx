'use client';

import { Settings, Smartphone, Palette, Package, CreditCard, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OptimizaTuNegocioPage() {
  const categorias = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Apps Útiles',
      color: 'from-indigo-500 to-indigo-600',
      herramientas: [
        { nombre: 'Google My Business', uso: 'Presencia local en Google' },
        { nombre: 'Trello', uso: 'Organización de tareas' },
        { nombre: 'Canva', uso: 'Diseño gráfico fácil' }
      ]
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Diseño',
      color: 'from-pink-500 to-pink-600',
      herramientas: [
        { nombre: 'Canva Pro', uso: 'Diseño profesional' },
        { nombre: 'Remove.bg', uso: 'Quitar fondos de imágenes' },
        { nombre: 'Unsplash', uso: 'Fotos gratuitas de calidad' }
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Inventario',
      color: 'from-blue-500 to-blue-600',
      herramientas: [
        { nombre: 'Google Sheets', uso: 'Control básico' },
        { nombre: 'Inventario Simple', uso: 'App especializada' },
        { nombre: 'Stock Manager', uso: 'Alertas automáticas' }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pagos',
      color: 'from-green-500 to-green-600',
      herramientas: [
        { nombre: 'VisaNet Guatemala', uso: 'Pagos con tarjeta' },
        { nombre: 'Tigo Money', uso: 'Billetera móvil' },
        { nombre: 'Credomatic', uso: 'POS y pagos online' }
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Organización',
      color: 'from-orange-500 to-orange-600',
      herramientas: [
        { nombre: 'Google Calendar', uso: 'Agenda de citas' },
        { nombre: 'Notion', uso: 'Todo en uno' },
        { nombre: 'Asana', uso: 'Gestión de proyectos' }
      ]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'IA Práctica',
      color: 'from-purple-500 to-purple-600',
      herramientas: [
        { nombre: 'ChatGPT', uso: 'Ideas y textos' },
        { nombre: 'Copy.ai', uso: 'Marketing copy' },
        { nombre: 'Midjourney', uso: 'Imágenes con IA' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Settings className="w-4 h-4" />
            Optimiza tu Negocio
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Herramientas para Trabajar Mejor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mejora tu eficiencia con apps y servicios diseñados para emprendedores
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categorias.map((categoria, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${categoria.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {categoria.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{categoria.title}</h3>
              <div className="space-y-3">
                {categoria.herramientas.map((herramienta, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all cursor-pointer">
                    <p className="font-semibold text-gray-900 text-sm">{herramienta.nombre}</p>
                    <p className="text-xs text-gray-600">{herramienta.uso}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tip destacado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white text-center mb-12"
        >
          <Brain className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">💡 Consejo Pro</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            No necesitas usar todas las herramientas. Empieza con 2-3 que resuelvan tus necesidades más urgentes.
          </p>
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-indigo-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
