'use client';

import { DollarSign, Building2, TrendingUp, Landmark, Globe, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AccesoCapitalPage() {
  const programasPublicos = [
    {
      nombre: 'Fondo de Emprendimiento',
      entidad: 'Ministerio de Economía',
      monto: 'Hasta Q50,000',
      tipo: 'Fondo perdido',
      color: 'from-green-500 to-green-600'
    },
    {
      nombre: 'Créditos BANRURAL',
      entidad: 'BANRURAL',
      monto: 'Q10,000 - Q500,000',
      tipo: 'Crédito',
      color: 'from-blue-500 to-blue-600'
    },
    {
      nombre: 'Programa MIPYME',
      entidad: 'Banco Industrial',
      monto: 'Q5,000 - Q250,000',
      tipo: 'Crédito preferencial',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const capitalSemilla = [
    { nombre: 'Incubadora TechBA', enfoque: 'Tecnología', etapa: 'Pre-seed' },
    { nombre: 'Impact Hub', enfoque: 'Impacto social', etapa: 'Seed' },
    { nombre: 'Chrysalis Guatemala', enfoque: 'General', etapa: 'Early stage' }
  ];

  const plataformasExternas = [
    { nombre: 'Kiva', descripcion: 'Microcréditos comunitarios', sitio: 'kiva.org' },
    { nombre: 'GoFundMe', descripcion: 'Crowdfunding internacional', sitio: 'gofundme.com' },
    { nombre: 'Kickstarter', descripcion: 'Proyectos creativos', sitio: 'kickstarter.com' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <DollarSign className="w-4 h-4" />
            Acceso a Capital
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Financia tu Emprendimiento
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre opciones de financiamiento adaptadas a tu etapa y necesidades
          </p>
        </motion.div>

        {/* Programas públicos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-green-600" />
            Programas Públicos y Bancarios
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {programasPublicos.map((programa, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${programa.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{programa.nombre}</h3>
                <p className="text-sm text-gray-600 mb-4">{programa.entidad}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Monto:</span>
                    <span className="font-bold text-green-600">{programa.monto}</span>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {programa.tipo}
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-green-50 hover:bg-green-100 rounded-xl font-semibold text-sm transition-all">
                  Más información →
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Capital semilla */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Capital Semilla e Inversión
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {capitalSemilla.map((programa, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white"
              >
                <Building2 className="w-8 h-8 mb-4 opacity-90" />
                <h3 className="font-bold text-lg mb-2">{programa.nombre}</h3>
                <p className="text-sm opacity-90 mb-1">{programa.enfoque}</p>
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                  {programa.etapa}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plataformas externas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Plataformas Internacionales</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {plataformasExternas.map((plataforma, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <h3 className="font-bold mb-1">{plataforma.nombre}</h3>
                <p className="text-sm opacity-90 mb-2">{plataforma.descripcion}</p>
                <p className="text-xs bg-white/20 inline-block px-2 py-1 rounded">{plataforma.sitio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA asesoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-elegant text-center mb-12"
        >
          <Phone className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda para aplicar?</h2>
          <p className="text-gray-600 mb-6">Nuestros asesores te guían en el proceso de solicitud</p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
            Contactar Asesor
          </button>
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-green-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
