'use client';

import { ShoppingCart, Smartphone, Store, MessageCircle, TrendingUp, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VendeEnLineaPage() {
  const herramientas = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Catálogo Digital',
      description: 'Crea tu catálogo online con fotos y precios',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp Business',
      description: 'Vende directamente por WhatsApp',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: 'Marketplace Local',
      description: 'Únete al marketplace de emprendedores',
      color: 'from-purple-500 to-purple-600',
      destacado: true
    }
  ];

  const pasos = [
    { numero: 1, titulo: 'Registra tu negocio', descripcion: 'Completa tu perfil de vendedor' },
    { numero: 2, titulo: 'Sube tus productos', descripcion: 'Agrega fotos y descripciones' },
    { numero: 3, titulo: 'Configura pagos', descripcion: 'Activa métodos de pago' },
    { numero: 4, titulo: '¡Empieza a vender!', descripcion: 'Promociona y atiende clientes' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <ShoppingCart className="w-4 h-4" />
            Vende en Línea
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Activa tus Ventas Digitales
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Llega a más clientes y aumenta tus ventas con herramientas digitales
          </p>
        </motion.div>

        {/* Herramientas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {herramientas.map((herramienta, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all ${
                herramienta.destacado ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {herramienta.destacado && (
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  ⭐ Recomendado
                </span>
              )}
              <div className={`w-12 h-12 bg-gradient-to-br ${herramienta.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {herramienta.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{herramienta.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{herramienta.description}</p>
              <button className="w-full py-2 bg-gray-50 hover:bg-blue-50 rounded-xl font-semibold text-sm transition-all">
                Configurar →
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white text-center mb-12"
        >
          <Package className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Crea tu Tienda Online</h2>
          <p className="text-lg mb-8 opacity-90">
            Administra productos, inventario y ventas desde un solo lugar
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:shadow-xl transition-all">
            🚀 Crear Mi Tienda
          </button>
        </motion.div>

        {/* Pasos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Cómo empezar?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {paso.numero}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                <p className="text-sm text-gray-600">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-blue-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
