'use client';

import { MessageCircle, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComunidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Comunidad de Emprendedores
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conecta, colabora y crece con otros emprendedores de Chiquimula
          </p>
        </div>

        {/* Cards de características */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all"
            whileHover={{ y: -8 }}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-[#003d7a]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Foros de Discusión</h2>
            <p className="text-gray-600 mb-6">
              Participa en conversaciones sobre temas de interés, comparte experiencias y aprende de otros emprendedores.
            </p>
            <button className="text-[#003d7a] font-semibold hover:underline">
              Próximamente →
            </button>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all"
            whileHover={{ y: -8 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Networking</h2>
            <p className="text-gray-600 mb-6">
              Encuentra socios, colaboradores y mentores que puedan ayudarte a llevar tu emprendimiento al siguiente nivel.
            </p>
            <button className="text-green-700 font-semibold hover:underline">
              Próximamente →
            </button>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all"
            whileHover={{ y: -8 }}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-purple-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ideas y Proyectos</h2>
            <p className="text-gray-600 mb-6">
              Comparte tus ideas, recibe retroalimentación y encuentra colaboradores para tus proyectos innovadores.
            </p>
            <button className="text-purple-700 font-semibold hover:underline">
              Próximamente →
            </button>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all"
            whileHover={{ y: -8 }}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-orange-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Historias de Éxito</h2>
            <p className="text-gray-600 mb-6">
              Lee testimonios inspiradores de emprendedores locales que han logrado sus metas y aprende de sus experiencias.
            </p>
            <button className="text-orange-700 font-semibold hover:underline">
              Próximamente →
            </button>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#003d7a] to-[#0056b3] rounded-3xl p-12 text-center text-white shadow-elegant-xl">
          <h2 className="text-3xl font-serif font-bold mb-4">
            ¿Listo para unirte a la comunidad?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Estamos construyendo un espacio donde los emprendedores de Chiquimula pueden conectar, colaborar y crecer juntos.
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
            <p className="text-sm font-semibold">🚀 Funcionalidades en desarrollo</p>
          </div>
        </div>
      </main>
    </div>
  );
}
