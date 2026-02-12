'use client';

import { 
  Sparkles, 
  ShoppingCart, 
  Settings, 
  DollarSign, 
  FileText, 
  GraduationCap, 
  Building2, 
  Users,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RecursosPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const recursos = [
    {
      id: 1,
      icon: <Sparkles className="w-7 h-7 text-white" />,
      title: 'Fortalece tu Marca',
      description: 'Estrategias de branding y marketing.',
      bgColor: 'bg-gradient-to-br from-purple-600 to-purple-700',
      ringColor: 'ring-purple-200',
      path: '/recursos/marca'
    },
    {
      id: 2,
      icon: <ShoppingCart className="w-7 h-7 text-white" />,
      title: 'Vende en Línea',
      description: 'Plataformas y herramientas de e-commerce.',
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
      ringColor: 'ring-blue-200',
      path: '/recursos/ventas-online'
    },
    {
      id: 3,
      icon: <Settings className="w-7 h-7 text-white" />,
      title: 'Optimiza tu Negocio',
      description: 'Mejora procesos y eficiencia.',
      bgColor: 'bg-gradient-to-br from-indigo-600 to-indigo-700',
      ringColor: 'ring-indigo-200',
      path: '/recursos/optimizacion'
    },
    {
      id: 4,
      icon: <DollarSign className="w-7 h-7 text-white" />,
      title: 'Acceso a Capital',
      description: 'Opciones de financiamiento y crédito.',
      bgColor: 'bg-gradient-to-br from-green-600 to-green-700',
      ringColor: 'ring-green-200',
      path: '/recursos/financiamiento'
    },
    {
      id: 5,
      icon: <FileText className="w-7 h-7 text-white" />,
      title: 'Trámites y Gestión',
      description: 'Formaliza y opera legalmente.',
      bgColor: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
      ringColor: 'ring-cyan-200',
      path: '/recursos/tramites'
    },
    {
      id: 6,
      icon: <GraduationCap className="w-7 h-7 text-white" />,
      title: 'Capacitación',
      description: 'Cursos y talleres para el crecimiento.',
      bgColor: 'bg-gradient-to-br from-orange-600 to-orange-700',
      ringColor: 'ring-orange-200',
      path: '/recursos/capacitacion'
    },
    {
      id: 7,
      icon: <Building2 className="w-7 h-7 text-white" />,
      title: 'Vender al Estado',
      description: 'Acceso a compras públicas.',
      bgColor: 'bg-gradient-to-br from-red-600 to-red-700',
      ringColor: 'ring-red-200',
      path: '/recursos/compras-publicas'
    },
    {
      id: 8,
      icon: <Users className="w-7 h-7 text-white" />,
      title: 'Bolsa de Empleo',
      description: 'Conecta con talento y alianzas.',
      bgColor: 'bg-gradient-to-br from-teal-600 to-teal-700',
      ringColor: 'ring-teal-200',
      path: '/recursos/empleo-alianzas'
    }
  ];

  const filteredRecursos = recursos.filter(recurso =>
    recurso.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recurso.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">
              Centro de Recursos
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Herramientas y conocimientos para impulsar tu emprendimiento
            </p>
          </motion.div>

          {/* Barra de búsqueda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar recursos, programas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#003d7a] focus:ring-4 focus:ring-blue-100 transition-all text-sm sm:text-base"
              />
            </div>
          </motion.div>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredRecursos.map((recurso, index) => (
            <motion.div
              key={recurso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
              onClick={() => window.location.href = recurso.path}
            >
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-[#003d7a]/20 transition-all duration-300 shadow-sm hover:shadow-xl h-full">
                {/* Icono circular con gradiente */}
                <div className={`w-14 h-14 ${recurso.bgColor} rounded-xl flex items-center justify-center mb-3 shadow-lg ring-4 ${recurso.ringColor} group-hover:scale-110 transition-transform duration-300`}>
                  {recurso.icon}
                </div>

                {/* Contenido */}
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 group-hover:text-[#003d7a] transition-colors leading-tight">
                  {recurso.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                  {recurso.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecursos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No se encontraron recursos</h3>
            <p className="text-sm sm:text-base text-gray-600">Intenta con otros términos de búsqueda</p>
          </motion.div>
        )}

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-[#003d7a] to-[#0056b3] rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white shadow-elegant-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">
            ¿Necesitas ayuda personalizada?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Nuestro equipo está listo para asesorarte en el uso de estos recursos y ayudarte a alcanzar tus metas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#003d7a] rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base">
              📞 Contactar Asesor
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all border-2 border-white/30 text-sm sm:text-base">
              📚 Ver Guías
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
