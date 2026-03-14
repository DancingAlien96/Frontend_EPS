"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function PerfilModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, userProfile, loading } = useAuth();
  const role = (userProfile?.rol || 'usuario').toString().toLowerCase();
  const nombreCompleto = userProfile?.full_name || user?.displayName || 'Usuario';
  const correo = userProfile?.email || user?.email || '';
  const telefono = userProfile?.phone_number;
  const nombreEmprendimiento = userProfile?.specific_profile?.venture_name || userProfile?.specific_profile?.business_name;
  const rolActual = userProfile?.rol || userProfile?.member_type || 'usuario';
  
  // Detectar si el usuario está pendiente de aprobación
  const estaPendienteAprobacion = userProfile && 
    userProfile.registration_completed && 
    !userProfile.registration_approved;
  
  // Mostrar mensaje de ecosistema solo si NO está autenticado
  // (No mostrar si está pendiente de aprobación)
  const debeVerMensajeEcosistema = !userProfile;
  
  console.log('🔍 PerfilModal - userProfile:', userProfile);
  console.log('🔍 PerfilModal - rol:', role);
  console.log('🔍 PerfilModal - pendiente aprobación?:', estaPendienteAprobacion);
  console.log('🔍 PerfilModal - debe ver mensaje?:', debeVerMensajeEcosistema);
  
  // TODOS inician en vista perfil
  const [vista, setVista] = useState<'perfil' | 'beneficios'>('perfil');
  const [slideActual, setSlideActual] = useState(0);

  // Reiniciar vista cuando se abre el modal
  useEffect(() => {
    if (open) {
      console.log('🔄 Modal abierto - rol actual:', role);
      setVista('perfil');
      setSlideActual(0);
    }
  }, [open, role]);

  const slides = [
    {
      titulo: 'Emprendimiento',
      emoji: '💡',
      descripcion: 'Ideas o negocios en desarrollo',
      beneficios: [
        { icono: '🎯', texto: 'Asesoría para validar tu idea de negocio' },
        { icono: '📚', texto: 'Capacitaciones básicas de emprendimiento' },
        { icono: '🤝', texto: 'Conexión con mentores y asesores' },
        { icono: '🎪', texto: 'Participación en ferias y eventos' }
      ]
    },
    {
      titulo: 'Empresa (MIPYME)',
      emoji: '🏢',
      descripcion: 'Negocios formalizados',
      beneficios: [
        { icono: '💰', texto: 'Acceso a programas de financiamiento' },
        { icono: '📜', texto: 'Certificaciones empresariales' },
        { icono: '💼', texto: 'Publicar ofertas de empleo' },
        { icono: '📊', texto: 'Herramientas de análisis y crecimiento' }
      ]
    },
    {
      titulo: 'Organización',
      emoji: '🤝',
      descripcion: 'ONGs y fundaciones de apoyo',
      beneficios: [
        { icono: '📢', texto: 'Publicar programas de apoyo' },
        { icono: '🎓', texto: 'Organizar capacitaciones y talleres' },
        { icono: '📰', texto: 'Publicar noticias y convocatorias' },
        { icono: '🌐', texto: 'Visibilidad en el ecosistema' }
      ]
    },
    {
      titulo: 'Institución Pública',
      emoji: '🏛️',
      descripcion: 'Entidades gubernamentales',
      beneficios: [
        { icono: '📋', texto: 'Gestionar programas institucionales' },
        { icono: '📊', texto: 'Acceso a estadísticas del ecosistema' },
        { icono: '🎯', texto: 'Coordinación de políticas públicas' },
        { icono: '🔗', texto: 'Articulación con otras entidades' }
      ]
    },
    {
      titulo: 'Beneficios Comunes',
      emoji: '🎯',
      descripcion: 'Para todos los miembros',
      beneficios: [
        { icono: '👨‍💼', texto: 'Asesoría personalizada y mentoría' },
        { icono: '🌐', texto: 'Visibilidad en el directorio' },
        { icono: '📢', texto: 'Acceso a convocatorias y programas' },
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
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{nombreCompleto}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{correo}</p>

                    <div className="mt-3 text-xs sm:text-sm text-gray-700 space-y-1">
                      <p><strong>Rol:</strong> {rolActual}</p>
                      {telefono && <p><strong>Teléfono:</strong> {telefono}</p>}
                      {nombreEmprendimiento && <p><strong>Emprendimiento:</strong> {nombreEmprendimiento}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
                  <a href="/perfil/editar" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-900 text-white rounded-lg hover:bg-black transition-all duration-300 shadow-sm hover:shadow-md font-medium">Editar perfil</a>
                  <button onClick={handleClose} className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium">Cerrar</button>
                </div>

                {/* MENSAJE PARA USUARIOS - PERFIL EN REVISIÓN */}
                {estaPendienteAprobacion && (
                  <div className="mt-4 p-4 border-2 border-amber-500 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="text-center mb-3">
                      <div className="text-4xl mb-2">⏳</div>
                      <h3 className="text-lg font-bold text-gray-900">Tu perfil está siendo revisado</h3>
                      <p className="text-sm text-gray-700 mt-2">
                        Nuestro equipo está verificando la información que proporcionaste
                      </p>
                    </div>

                    <div className="space-y-3 mb-4 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-xl">✅</span>
                        <div>
                          <strong>Registro completado</strong>
                          <p className="text-gray-600">Has completado todos los pasos del registro</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xl">👨‍💼</span>
                        <div>
                          <strong>En proceso de verificación</strong>
                          <p className="text-gray-600">Un administrador revisará tu información en las próximas 48-72 horas</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xl">📧</span>
                        <div>
                          <strong>Te notificaremos por correo</strong>
                          <p className="text-gray-600">Recibirás un correo cuando tu perfil sea aprobado</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-amber-200">
                      <p className="text-xs text-gray-600 text-center">
                        <strong>💡 Mientras tanto:</strong> Puedes editar tu perfil y completar más información si lo deseas
                      </p>
                    </div>
                  </div>
                )}

                {/* MENSAJE PARA USUARIOS - UNIRSE AL ECOSISTEMA */}
                {debeVerMensajeEcosistema && (
                  <div className="mt-4 p-4 border-2 border-blue-500 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-center mb-3">
                      <div className="text-4xl mb-2">🚀</div>
                      <h3 className="text-lg font-bold text-gray-900">¡Únete al Ecosistema Emprendedor!</h3>
                      <p className="text-sm text-gray-700 mt-2">Forma parte de nuestra comunidad según tu tipo de perfil</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-xl">💡</span>
                        <span><strong>Emprendimiento:</strong> Ideas o negocios en desarrollo</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-xl">🏢</span>
                        <span><strong>Empresa (MIPYME):</strong> Negocios formalizados</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-xl">🤝</span>
                        <span><strong>Organización:</strong> ONGs y fundaciones de apoyo</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-xl">🏛️</span>
                        <span><strong>Institución Pública:</strong> Entidades gubernamentales</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <a
                        href="/auth/registro"
                        className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                      >
                        ✨ ¡Quiero ser parte del ecosistema!
                      </a>
                      <button
                        onClick={() => setVista('beneficios')}
                        className="w-full px-4 py-2 text-center border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                      >
                        Ver más información
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
              {!debeVerMensajeEcosistema && (
                <button 
                  onClick={() => setVista('perfil')}
                  className="flex items-center gap-1 text-gray-900 hover:text-gray-600 text-sm sm:text-base font-medium transition-colors duration-300"
                >
                  ← Volver
                </button>
              )}
              <button onClick={handleClose} className="text-2xl sm:text-3xl text-gray-400 hover:text-gray-900 transition-colors duration-300 ml-auto">✕</button>
            </div>

            {debeVerMensajeEcosistema && (
              <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">¡Únete al Ecosistema! 🚀</h2>
                <p className="text-sm sm:text-base text-gray-600">Descubre los beneficios de formar parte de nuestra comunidad</p>
              </div>
            )}

            <div className="relative">
              {/* Slide actual */}
              <div className="bg-white border-2 border-gray-300 rounded-2xl p-5 sm:p-6 min-h-[320px] sm:min-h-[350px] shadow-sm transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="text-4xl sm:text-5xl mb-2">{slides[slideActual].emoji}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{slides[slideActual].titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{slides[slideActual].descripcion}</p>
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
                  href="/auth/registro"
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  ¡Quiero ser parte del ecosistema! 🚀
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
