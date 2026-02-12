'use client';

import { Users, Briefcase, Handshake, TrendingUp, Building, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EmpleoAlianzasPage() {
  const categorias = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Ofertas de Empleo',
      descripcion: 'Encuentra talento local para tu equipo',
      color: 'from-teal-500 to-teal-600',
      ejemplos: ['Marketing digital', 'Diseño gráfico', 'Contabilidad', 'Desarrollo web']
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Servicios Profesionales',
      descripcion: 'Conecta con expertos para proyectos específicos',
      color: 'from-purple-500 to-purple-600',
      ejemplos: ['Consultoría', 'Legal', 'Fotografía', 'Redacción']
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: 'Alianzas entre MIPYMES',
      descripcion: 'Colabora con otros emprendedores',
      color: 'from-blue-500 to-blue-600',
      ejemplos: ['Compras conjuntas', 'Co-marketing', 'Distribución', 'Eventos']
    }
  ];

  const ventajas = [
    {
      titulo: 'Ahorra costos',
      descripcion: 'Comparte gastos en publicidad, logística y materias primas',
      icon: '💰'
    },
    {
      titulo: 'Amplía tu red',
      descripcion: 'Conoce emprendedores de otros sectores y regiones',
      icon: '🌐'
    },
    {
      titulo: 'Aumenta ventas',
      descripcion: 'Accede a clientes de tus aliados',
      icon: '📈'
    },
    {
      titulo: 'Fortalece capacidades',
      descripcion: 'Aprende de la experiencia de otros',
      icon: '🎯'
    }
  ];

  const tiposAlianza = [
    { tipo: 'Comercial', ejemplo: 'Vender productos complementarios juntos' },
    { tipo: 'Logística', ejemplo: 'Compartir transporte y entregas' },
    { tipo: 'Marketing', ejemplo: 'Campañas conjuntas en redes sociales' },
    { tipo: 'Producción', ejemplo: 'Compartir maquinaria o espacios' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Users className="w-4 h-4" />
            Empleo y Alianzas
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Conecta y Colabora
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra talento, ofrece servicios y crea alianzas estratégicas
          </p>
        </motion.div>

        {/* Categorías principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">{categoria.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{categoria.descripcion}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Ejemplos:</p>
                <div className="flex flex-wrap gap-2">
                  {categoria.ejemplos.map((ejemplo, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {ejemplo}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gray-50 hover:bg-teal-50 rounded-xl font-semibold text-sm transition-all">
                Explorar →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Ventajas de alianzas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ¿Por qué crear alianzas?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ventajas.map((ventaja, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white text-center"
              >
                <div className="text-4xl mb-3">{ventaja.icon}</div>
                <h3 className="font-bold text-lg mb-2">{ventaja.titulo}</h3>
                <p className="text-sm opacity-90">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tipos de alianza */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 text-white mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Tipos de Alianzas</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tiposAlianza.map((alianza, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <h3 className="font-bold mb-2">{alianza.tipo}</h3>
                <p className="text-sm opacity-90">{alianza.ejemplo}</p>
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
          <Building className="w-12 h-12 mx-auto mb-4 text-teal-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para colaborar?</h2>
          <p className="text-gray-600 mb-6">Únete a la red de emprendedores colaborativos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all">
              Publicar Oferta
            </button>
            <button className="px-8 py-4 bg-white border-2 border-teal-600 text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-all">
              Buscar Aliados
            </button>
          </div>
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:border-teal-500 transition-all"
          >
            ← Volver a Recursos
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
