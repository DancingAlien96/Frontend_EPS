'use client';

import { ArrowRight, FileText, GraduationCap, Building2, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecursosPage() {
  const recursos = [
    {
      id: 1,
      icon: <FileText className="w-8 h-8 text-[#003d7a]" />,
      title: 'Trámites y Gestión',
      description: 'Acceda a un portal directo de enlaces gubernamentales y herramientas esenciales para la formalización y operación legal de su empresa. Simplifique su burocracia y conviértase en crecer.',
      buttonText: 'Explorar Trámites',
      links: [
        { name: 'Registro Mercantil', url: 'https://www.rmgua.gob.gt/' },
        { name: 'SAT - Inscripción RTU', url: 'https://portal.sat.gob.gt/portal/' },
        { name: 'IGSS - Seguridad Social', url: 'https://www.igssgt.org/' },
        { name: 'Ministerio de Trabajo', url: 'https://www.mintrabajo.gob.gt/' },
      ],
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      icon: <GraduationCap className="w-8 h-8 text-green-700" />,
      title: 'Aprendizaje y Formación',
      description: 'Hub educativo integral con talleres, cursos especializados y guías prácticas diseñadas para fortalecer sus habilidades empresariales y las de su equipo de trabajo.',
      buttonText: 'Explorar Aprendizaje',
      links: [
        { name: 'INTECAP - Cursos', url: 'https://www.intecap.edu.gt/' },
        { name: 'AGEXPORT - Capacitaciones', url: 'https://export.com.gt/' },
        { name: 'Coursera - Emprendimiento', url: 'https://www.coursera.org/courses?query=emprendimiento' },
        { name: 'Google Actívate', url: 'https://grow.google/intl/es/google-activa/' },
      ],
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const estadisticas = [
    { icon: <Building2 className="w-6 h-6 text-[#003d7a]" />, numero: '150+', label: 'Entidades' },
    { icon: <BookOpen className="w-6 h-6 text-green-600" />, numero: '45', label: 'Herramientas' },
    { icon: <Users className="w-6 h-6 text-orange-600" />, numero: '2.5k', label: 'Emprendedores Activos' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-[#003d7a] mb-2 tracking-wide uppercase">
            Recursos Empresariales
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Centro de Recursos<br />para Emprendedores
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Herramientas estratégicas y conocimientos esenciales para impulsar el<br />
            crecimiento de su negocio en la región de Chiquimula.
          </p>
        </div>

        {/* Recursos Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {recursos.map((recurso) => (
            <motion.div 
              key={recurso.id}
              className={`${recurso.bgColor} border-2 ${recurso.borderColor} rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300`}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-elegant mb-4">
                  {recurso.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {recurso.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {recurso.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {recurso.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-medium text-gray-800">{link.name}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#003d7a] group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-[#003d7a] to-[#0056b3] text-white font-semibold py-3 px-6 rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                {recurso.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        

       
      </main>
    </div>
  );
}
