'use client';

import { GraduationCap, Video, BookOpen, Award, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CapacitacionPage() {
  const cursosGratuitos = [
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Google Actívate',
      descripcion: 'Marketing digital y comercio electrónico',
      duracion: '40 horas',
      nivel: 'Básico',
      color: 'from-red-500 to-red-600',
      enlace: 'https://learndigital.withgoogle.com/activate'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Coursera para Emprendedores',
      descripcion: 'Cursos de universidades internacionales',
      duracion: 'Variable',
      nivel: 'Intermedio',
      color: 'from-blue-500 to-blue-600',
      enlace: 'https://www.coursera.org'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'INTECAP',
      descripcion: 'Capacitaciones técnicas y empresariales',
      duracion: '20-80 horas',
      nivel: 'Todos',
      color: 'from-green-500 to-green-600',
      enlace: 'https://www.intecap.edu.gt'
    }
  ];

  const rutasAprendizaje = [
    {
      nivel: 'Principiante',
      temas: ['Idea de negocio', 'Plan básico', 'Primeros clientes'],
      color: 'bg-green-100 text-green-700'
    },
    {
      nivel: 'Intermedio',
      temas: ['Marketing digital', 'Finanzas', 'Ventas'],
      color: 'bg-blue-100 text-blue-700'
    },
    {
      nivel: 'Avanzado',
      temas: ['Escalamiento', 'Inversión', 'Internacionalización'],
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const programasPublicos = [
    { nombre: 'Programa de Capacitación MIPYME', entidad: 'MINECO' },
    { nombre: 'Escuela de Emprendimiento', entidad: 'Municipalidad de Guatemala' },
    { nombre: 'Capacitaciones AGEXPORT', entidad: 'AGEXPORT' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <GraduationCap className="w-4 h-4" />
            Capacitación
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Aprende y Crece
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cursos gratuitos y programas públicos para fortalecer tus habilidades
          </p>
        </motion.div>

        {/* Cursos gratuitos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cursosGratuitos.map((curso, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${curso.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {curso.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{curso.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{curso.descripcion}</p>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {curso.duracion}
                </span>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {curso.nivel}
                </span>
              </div>

              <a
                href={curso.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 bg-gray-50 hover:bg-orange-50 rounded-xl font-semibold text-sm transition-all text-center"
              >
                Acceder al curso →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Rutas de aprendizaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Rutas de Aprendizaje por Nivel</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {rutasAprendizaje.map((ruta, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-gray-900">
                <span className={`inline-block ${ruta.color} px-3 py-1 rounded-full text-sm font-bold mb-4`}>
                  {ruta.nivel}
                </span>
                <ul className="space-y-2">
                  {ruta.temas.map((tema, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-orange-500" />
                      {tema}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Programas públicos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Programas Públicos</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {programasPublicos.map((programa, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-orange-300 transition-all"
              >
                <GraduationCap className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{programa.nombre}</h3>
                <p className="text-sm text-gray-600">{programa.entidad}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-elegant text-center mb-12"
        >
          <Award className="w-12 h-12 mx-auto mb-4 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-gray-600 mb-6">Te ayudamos a armar tu plan de capacitación personalizado</p>
          <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
            Crear Mi Plan de Aprendizaje
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-orange-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
