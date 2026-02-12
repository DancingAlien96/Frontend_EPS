"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function PerfilModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, userProfile, loading } = useAuth();
  const role = (userProfile?.rol || '').toString().toLowerCase();
  const [vista, setVista] = useState<'perfil' | 'beneficios'>('perfil');
  const [slideActual, setSlideActual] = useState(0);

  const slides = [
    {
      titulo: 'MIPYME (Formalizado)',
      emoji: '🏢',
      beneficios: [
        { icono: '💼', texto: 'Publicar ofertas de empleo para tu negocio' },
        { icono: '💰', texto: 'Acceso a programas de financiamiento' },
        { icono: '📜', texto: 'Certificaciones y capacitaciones especializadas' },
        { icono: '📊', texto: 'Estadísticas y análisis de tu emprendimiento' }
      ]
    },
    {
      titulo: 'Emprendedor Informal',
      emoji: '💡',
      beneficios: [
        { icono: '🎪', texto: 'Inscripción a eventos y ferias empresariales' },
        { icono: '🎓', texto: 'Talleres y capacitaciones gratuitas' },
        { icono: '🤝', texto: 'Networking con otros emprendedores' },
        { icono: '📱', texto: 'Perfil en el directorio público' }
      ]
    },
    {
      titulo: 'Beneficios Comunes',
      emoji: '🎯',
      beneficios: [
        { icono: '👨‍💼', texto: 'Asesoría personalizada para tu negocio' },
        { icono: '🌐', texto: 'Visibilidad en el directorio de emprendedores' },
        { icono: '📢', texto: 'Acceso a convocatorias y programas de apoyo' },
        { icono: '✨', texto: 'Soporte continuo del ecosistema' }
      ]
    }
  ];

  const siguienteSlide = () => {
    setSlideActual((prev) => (prev + 1) % slides.length);
  };

  const anteriorSlide = () => {
    setSlideActual((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleClose = () => {
    setVista('perfil');
    setSlideActual(0);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-4 sm:p-6 z-60 max-h-[95vh] overflow-y-auto">
        
        {/* VISTA DE PERFIL */}
        {vista === 'perfil' && (
          <>
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Mi Perfil</h2>
              <button onClick={handleClose} className="text-2xl sm:text-3xl text-gray-400 hover:text-gray-900 transition-colors duration-300">✕</button>
            </div>

            {loading ? (
              <div className="p-4">Cargando...</div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3 sm:gap-4">
                  <img
                    src={userProfile?.foto_perfil || user?.photoURL || '/avatar-placeholder.png'}
                    alt="Foto de perfil"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
                  />
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{userProfile?.nombre_completo || user?.displayName || 'Usuario'}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{userProfile?.correo_electronico || user?.email}</p>

                    <div className="mt-3 text-xs sm:text-sm text-gray-700 space-y-1">
                      <p><strong>Rol:</strong> {userProfile?.rol || 'usuario'}</p>
                      {userProfile?.telefono && <p><strong>Teléfono:</strong> {userProfile.telefono}</p>}
                      {userProfile?.nombre_emprendimiento && <p><strong>Emprendimiento:</strong> {userProfile.nombre_emprendimiento}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
                  <a href="/perfil/editar" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-900 text-white rounded-lg hover:bg-black transition-all duration-300 shadow-sm hover:shadow-md font-medium">Editar perfil</a>
                  <button onClick={handleClose} className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium">Cerrar</button>
                </div>

                {role === 'usuario' && (
                  <div className="p-3 sm:p-4 border-2 border-gray-300 rounded-2xl bg-white shadow-sm">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">¡Únete a nuestro ecosistema!</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Forma parte de nuestra comunidad de emprendedores y accede a programas, recursos y oportunidades de crecimiento.</p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <a
                        href="/volverme-emprendedor"
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-900 text-white rounded-lg text-center hover:bg-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                      >
                        Comenzar ahora
                      </a>
                      <button 
                        onClick={() => setVista('beneficios')}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border-2 border-gray-900 text-gray-900 rounded-lg text-center hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium"
                      >
                        Más información
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* VISTA DE BENEFICIOS (CARRUSEL) */}
        {vista === 'beneficios' && (
          <>
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <button 
                onClick={() => setVista('perfil')}
                className="flex items-center gap-1 text-gray-900 hover:text-gray-600 text-sm sm:text-base font-medium transition-colors duration-300"
              >
                ← Volver
              </button>
              <button onClick={handleClose} className="text-2xl sm:text-3xl text-gray-400 hover:text-gray-900 transition-colors duration-300">✕</button>
            </div>

            <div className="relative">
              {/* Slide actual */}
              <div className="bg-white border-2 border-gray-300 rounded-2xl p-5 sm:p-6 min-h-[320px] sm:min-h-[350px] shadow-sm transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="text-4xl sm:text-5xl mb-2">{slides[slideActual].emoji}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{slides[slideActual].titulo}</h3>
                </div>

                <div className="space-y-3 mt-6">
                  {slides[slideActual].beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-2xl flex-shrink-0">{beneficio.icono}</span>
                      <p className="text-sm sm:text-base text-gray-700">{beneficio.texto}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navegación */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={anteriorSlide}
                  className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-900 hover:text-white text-gray-900 transition-all duration-300 shadow-sm"
                  aria-label="Anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Indicadores */}
                <div className="flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideActual(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === slideActual ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`Ir a slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={siguienteSlide}
                  className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-900 hover:text-white text-gray-900 transition-all duration-300 shadow-sm"
                  aria-label="Siguiente"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Contador */}
              <div className="text-center mt-3 text-sm text-gray-600">
                {slideActual + 1} de {slides.length}
              </div>

              {/* Botón de acción */}
              <div className="mt-6">
                <a
                  href="/volverme-emprendedor"
                  className="block w-full px-4 py-3 text-center bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  ¡Quiero unirme! 🚀
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
