'use client';

import { Building2, FileCheck, Search, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VenderAlEstadoPage() {
  const requisitos = [
    {
      categoria: 'Documentación Legal',
      items: ['Patente de comercio vigente', 'RTU actualizado', 'Constancia de registro en Guatecompras']
    },
    {
      categoria: 'Capacidad Financiera',
      items: ['Estados financieros', 'Flujo de caja', 'Fianzas (según monto)']
    },
    {
      categoria: 'Experiencia',
      items: ['Portafolio de trabajos', 'Referencias comerciales', 'Cumplimiento de normativas']
    }
  ];

  const pasos = [
    { numero: 1, titulo: 'Regístrate en Guatecompras', descripcion: 'Crea tu usuario en la plataforma oficial' },
    { numero: 2, titulo: 'Completa tu perfil', descripcion: 'Sube documentación requerida' },
    { numero: 3, titulo: 'Busca licitaciones', descripcion: 'Filtra por tu rubro y capacidad' },
    { numero: 4, titulo: 'Presenta ofertas', descripcion: 'Sigue las bases de cada evento' }
  ];

  const consejos = [
    '⚠️ Lee completamente las bases antes de ofertar',
    '📅 Respeta fechas límite de presentación',
    '💰 Calcula bien costos y márgenes',
    '📄 Ten documentos actualizados',
    '🤝 Considera alianzas para proyectos grandes'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Building2 className="w-4 h-4" />
            Vender al Estado
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Compras Públicas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprende a participar en licitaciones y eventos de compras del Estado
          </p>
        </motion.div>

        {/* Requisitos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-red-600" />
            Requisitos Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {requisitos.map((req, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4">{req.categoria}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Proceso paso a paso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Cómo participar?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {paso.numero}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                <p className="text-sm text-gray-600">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Guatecompras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-white text-center mb-12"
        >
          <Search className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Busca Eventos Activos</h2>
          <p className="text-lg mb-8 opacity-90">
            Accede a la plataforma oficial de compras públicas
          </p>
          <a
            href="https://www.guatecompras.gt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-2xl font-bold hover:shadow-xl transition-all"
          >
            Ir a Guatecompras
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Consejos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-lg text-gray-900">Consejos Importantes</h3>
          </div>
          <div className="space-y-2">
            {consejos.map((consejo, index) => (
              <div key={index} className="text-gray-700">
                {consejo}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-red-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
