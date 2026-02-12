'use client';

import { FileText, Building, BookCheck, ExternalLink, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TramitesGestionPage() {
  const tramites = [
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Registro Mercantil',
      descripcion: 'Formaliza tu empresa legalmente',
      pasos: ['RTU en SAT', 'Escritura pública', 'Inscripción Registro Mercantil'],
      enlace: 'registro-mercantil.gob.gt',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: <BookCheck className="w-6 h-6" />,
      title: 'Marca Registrada',
      descripcion: 'Protege tu nombre y logo',
      pasos: ['Búsqueda fonética', 'Presentación solicitud', 'Publicación en diario'],
      enlace: 'rpi.gob.gt',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'SAT: RTU y FEL',
      descripcion: 'Cumple con obligaciones tributarias',
      pasos: ['Inscripción RTU', 'Habilitación FEL', 'Declaraciones mensuales'],
      enlace: 'portal.sat.gob.gt',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const enlaces = [
    { nombre: 'Portal SAT', url: 'portal.sat.gob.gt', descripcion: 'Trámites tributarios' },
    { nombre: 'Registro Mercantil', url: 'registromercantil.gob.gt', descripcion: 'Constitución de empresas' },
    { nombre: 'RPI', url: 'rpi.gob.gt', descripcion: 'Registro de propiedad intelectual' },
    { nombre: 'Guate Compras', url: 'guatecompras.gt', descripcion: 'Compras públicas' }
  ];

  const tips = [
    '📋 Ten copias de DPI a mano',
    '💰 Consulta tarifas actualizadas',
    '⏰ Algunos trámites toman semanas',
    '✅ Verifica requisitos antes de ir'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <FileText className="w-4 h-4" />
            Trámites y Gestión
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Formaliza tu Emprendimiento
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guías claras para completar tus trámites legales y tributarios
          </p>
        </motion.div>

        {/* Trámites principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tramites.map((tramite, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${tramite.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {tramite.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tramite.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{tramite.descripcion}</p>
              
              <div className="space-y-2 mb-4">
                {tramite.pasos.map((paso, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{paso}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://${tramite.enlace}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 hover:bg-cyan-50 rounded-xl font-semibold text-sm transition-all text-gray-900"
              >
                Ver sitio oficial
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Enlaces oficiales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-8 text-white mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <ExternalLink className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Enlaces Oficiales</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {enlaces.map((enlace, index) => (
              <a
                key={index}
                href={`https://${enlace.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold mb-1">{enlace.nombre}</h3>
                  <p className="text-sm opacity-90">{enlace.descripcion}</p>
                </div>
                <ExternalLink className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-lg text-gray-900">Tips Importantes</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA asesoría pagada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-elegant text-center mb-12"
        >
          <Phone className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Prefieres ayuda profesional?</h2>
          <p className="text-gray-600 mb-6">Conectamos con abogados y gestores especializados</p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
            Ver Opciones de Asesoría
          </button>
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-cyan-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
