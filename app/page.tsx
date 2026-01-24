'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroCarousel from '@/components/public/HeroCarousel';
import RegistroModal from '@/components/public/RegistroModal';
import NoticiasPreview from '@/components/public/NoticiasPreview';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('inicio');
  const router = useRouter();

  const handleViewChange = (view: string) => {
    if (view === 'noticias') {
      // navegar a la página /noticias para mostrar la sección real
      router.push('/noticias');
      return;
    }

    setActiveView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header moved to layout */}

      {/* VISTA: INICIO */}
      <AnimatePresence mode="wait">
        {activeView === 'inicio' && (
          <motion.div
            key="inicio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section>
              <HeroCarousel onOpenModal={() => setIsModalOpen(true)} />
            </section>

            {/* ¿Por qué elegirnos? */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#003d7a] mb-4">
                  ¿Por qué elegirnos?
                </h2>
                <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
                  Somos el aliado estratégico que tu emprendimiento necesita para crecer y
                  consolidarse en el mercado
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: '💼',
                      title: 'Asesoría Personalizada',
                      desc: 'Expertos en distintas áreas te acompañan en cada etapa de tu emprendimiento',
                    },
                    {
                      icon: '💰',
                      title: 'Financiamiento Accesible',
                      desc: 'Fondos semilla y créditos preferenciales para impulsar tu negocio',
                    },
                    {
                      icon: '📚',
                      title: 'Capacitación Continua',
                      desc: 'Talleres y cursos gratuitos para fortalecer tus conocimientos empresariales',
                    },
                    {
                      icon: '🤝',
                      title: 'Red de Contactos',
                      desc: 'Conecta con otros emprendedores y genera alianzas estratégicas',
                    },
                    {
                      icon: '🤝',
                      title: 'Red de Contactos',
                      desc: 'Conecta con otros emprendedores y genera alianzas estratégicas',
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
                    >
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold text-[#003d7a] mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Nuestro Impacto */}
            <section className="bg-white py-20 px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#003d7a] mb-16">
                  Nuestro Impacto en Chiquimula
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                  {[
                    { number: '1,200+', label: 'Emprendedores Apoyados', color: 'text-blue-600' },
                    { number: 'Q15M', label: 'En Financiamiento', color: 'text-green-600' },
                    { number: '850+', label: 'Negocios Consolidados', color: 'text-red-500' },
                    { number: '11', label: 'Municipios Atendidos', color: 'text-purple-600' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                        {stat.number}
                      </div>
                      <p className="text-lg text-gray-600">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Galería de Imágenes */}
            <section className="bg-gray-50 py-20 px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#003d7a] mb-4">
                  Emprendedores en Acción
                </h2>
                <p className="text-center text-lg text-gray-600 mb-16">
                  Conoce a algunos de nuestros emprendedores exitosos
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      gradient: 'from-[#003d7a] to-[#0066cc]',
                      title: 'Innovación en Textiles',
                      desc: 'Emprendedores del sector textil generando empleos en Chiquimula',
                      icon: '🧵',
                    },
                    {
                      gradient: 'from-[#007bff] to-[#0099ff]',
                      title: 'Comercio Local',
                      desc: 'Negocios familiares transformándose en empresas exitosas',
                      icon: '🏪',
                    },
                    {
                      gradient: 'from-[#28a745] to-[#20c997]',
                      title: 'Agricultura Sostenible',
                      desc: 'Proyectos agrícolas innovadores con impacto social',
                      icon: '🌾',
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className={`w-full h-60 bg-gradient-to-br ${item.gradient} flex items-center justify-center text-8xl`}>
                        {item.icon}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#003d7a] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Últimas Noticias (preview) */}
            <NoticiasPreview />

            {/* CTA Final */}
            <section className="bg-gradient-to-r from-[#003d7a] to-[#0066cc] py-20 px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-white mb-6">
                  ¿Listo para comenzar?
                </h2>
                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                  Únete a más de 1,200 emprendedores que ya están transformando sus sueños
                  en realidad. El momento es ahora.
                </p>
                <div className="flex flex-wrap gap-5 justify-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-4 bg-white text-[#003d7a] rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    ✨ Registrarme Ahora
                  </button>
                  <button
                    onClick={() => handleViewChange('contacto')}
                    className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-[#003d7a] transition-all"
                  >
                    💬 Más Información
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VISTA: PROGRAMAS */}
      <AnimatePresence mode="wait">
        {activeView === 'programas' && (
          <motion.div
            key="programas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-20 px-6"
          >
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
                Programas de Apoyo
              </h1>
              <p className="text-center text-lg text-gray-600 mb-16">
                Encuentra el programa que mejor se adapte a las necesidades de tu
                emprendimiento
                  </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Programa de Capacitación Empresarial',
                    badge: '🔓 Inscripciones Abiertas',
                    desc: 'Aprende los fundamentos de la gestión empresarial, marketing y ventas.',
                    details: [
                      { icon: '📅', label: 'Duración', value: '3 meses' },
                      { icon: '📍', label: 'Modalidad', value: 'Presencial y Virtual' },
                      { icon: '💵', label: 'Costo', value: 'Gratuito' },
                      { icon: '👥', label: 'Cupos', value: '50 disponibles' },
                    ],
                  },
                  {
                    title: 'Fondo Semilla para Emprendedores',
                    badge: '🔓 Convocatoria Activa',
                    desc: 'Financiamiento de hasta Q25,000 para poner en marcha tu emprendimiento.',
                    details: [
                      { icon: '📅', label: 'Plazo', value: 'Hasta 24 meses' },
                      { icon: '💰', label: 'Monto', value: 'Q5,000 - Q25,000' },
                      { icon: '📋', label: 'Requisitos', value: 'Plan de negocio' },
                      { icon: '🎯', label: 'Tasa', value: 'Preferencial 5% anual' },
                    ],
                  },
                  {
                    title: 'Asesoría Técnica Especializada',
                    badge: '🔓 Disponible',
                    desc: 'Recibe orientación personalizada de expertos en diferentes áreas.',
                    details: [
                      { icon: '⏰', label: 'Sesiones', value: '2 horas semanales' },
                      {
                        icon: '👨‍💼',
                        label: 'Expertos en',
                        value: 'Finanzas, Marketing, Legal',
                      },
                      { icon: '📍', label: 'Modalidad', value: 'Virtual o Presencial' },
                      { icon: '💵', label: 'Costo', value: 'Gratuito' },
                    ],
                  },
                ].map((program, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="bg-gradient-to-r from-[#007bff] to-[#003d7a] text-white p-6">
                      <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                      <span className="inline-block bg-white/25 px-3 py-1 rounded-full text-sm">
                        {program.badge}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{program.desc}</p>
                      <div className="space-y-3 mb-6">
                        {program.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm">
                            <span className="text-xl">{detail.icon}</span>
                            <div>
                              <strong className="text-gray-800">{detail.label}:</strong>{' '}
                              {detail.value}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 bg-[#28a745] text-white rounded-lg font-semibold hover:bg-[#218838] transition-all"
                      >
                        Solicitar Ingreso
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VISTA: EVENTOS */}
      <AnimatePresence mode="wait">
        {activeView === 'eventos' && (
          <motion.div
            key="eventos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-20 px-6"
          >
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
                Próximos Eventos
              </h1>
              <p className="text-center text-lg text-gray-600 mb-16">
                Participa en talleres, ferias y eventos de networking
                  </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Taller: Marketing Digital para Emprendedores',
                    date: '📅 15 Febrero 2026',
                    gradient: 'from-green-500 to-teal-500',
                    details: [
                      { icon: '🕐', text: '9:00 AM - 1:00 PM' },
                      { icon: '📍', text: 'Salón Municipal, Chiquimula' },
                      { icon: '👥', text: '40 personas' },
                      { icon: '💵', text: 'Gratuito' },
                    ],
                  },
                  {
                    title: 'Feria del Emprendedor 2026',
                    date: '📅 20 Febrero 2026',
                    gradient: 'from-red-500 to-orange-500',
                    details: [
                      { icon: '🕐', text: '8:00 AM - 5:00 PM' },
                      { icon: '📍', text: 'Plaza Central, Chiquimula' },
                      { icon: '🏪', text: '60 stands disponibles' },
                      { icon: '💵', text: 'Gratuito' },
                    ],
                  },
                  {
                    title: 'Networking: Conectando Emprendedores',
                    date: '📅 10 Marzo 2026',
                    gradient: 'from-purple-500 to-pink-500',
                    details: [
                      { icon: '🕐', text: '6:00 PM - 9:00 PM' },
                      { icon: '📍', text: 'Hotel Victoria, Esquipulas' },
                      { icon: '🍽️', text: 'Incluye: Coffee break' },
                      { icon: '💵', text: 'Gratuito' },
                    ],
                  },
                ].map((evento, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className={`bg-gradient-to-r ${evento.gradient} text-white p-6`}>
                      <h3 className="text-xl font-bold mb-2">{evento.title}</h3>
                      <span className="inline-block bg-white/25 px-3 py-1 rounded-full text-sm">
                        {evento.date}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3 mb-6">
                        {evento.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <span className="text-xl">{detail.icon}</span>
                            <span className="text-gray-700">{detail.text}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 bg-[#28a745] text-white rounded-lg font-semibold hover:bg-[#218838] transition-all"
                      >
                        Inscribirme
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Noticias handled on /noticias route (protótipo component) */}

      {/* VISTA: CONTACTO */}
      <AnimatePresence mode="wait">
        {activeView === 'contacto' && (
          <motion.div
            key="contacto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-20 px-6"
          >
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
                Contáctanos
              </h1>
              <p className="text-center text-lg text-gray-600 mb-16">
                ¿Tienes preguntas? Envíanos un mensaje
                  </p>

              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(
                      '✅ ¡Mensaje enviado!\n\nGracias por contactarnos. Te responderemos pronto.'
                    );
                    e.currentTarget.reset();
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Nombre Completo <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Teléfono <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Correo Electrónico <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Municipio
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option value="">Seleccione...</option>
                      <option>Chiquimula</option>
                      <option>Esquipulas</option>
                      <option>Quetzaltepeque</option>
                      <option>Camotán</option>
                      <option>Jocotán</option>
                      <option>Olopa</option>
                      <option>San Juan Ermita</option>
                      <option>Concepción Las Minas</option>
                      <option>San Jacinto</option>
                      <option>San José La Arada</option>
                      <option>Ipala</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Asunto <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Mensaje <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#28a745] text-white rounded-lg font-semibold hover:bg-[#218838] transition-all"
                    >
                      📤 Enviar Mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Registro */}
      <RegistroModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
