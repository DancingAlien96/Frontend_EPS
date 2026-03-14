'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MemberTypeSelector from './MemberTypeSelector';
import ProgressBar from './ProgressBar';
import StepNavigation from './StepNavigation';
import Paso1Form from './forms/Paso1Form';
import Paso2Form from './forms/Paso2Form';
import Paso3Form from './forms/Paso3Form';
import Paso4Form from './forms/Paso4Form';
import Paso5Form from './forms/Paso5Form';
import Paso6Form from './forms/Paso6Form';
import api from '@/lib/axios';

interface RegistrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  skipIntro?: boolean; // Si es true, salta directo a la selección de tipo
}

export default function RegistrationWizard({ isOpen, onClose, skipIntro = false }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(skipIntro ? 0 : -1); // -1 = pantalla inicial, 0 = selección de tipo, 1-6 = pasos del formulario
  const [showBenefits, setShowBenefits] = useState(false); // true = mostrando carrusel de beneficios
  const [benefitSlide, setBenefitSlide] = useState(0); // índice del slide actual
  const [memberType, setMemberType] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Debug - ver si el modal se abre
  useEffect(() => {
    console.log('🔥 RegistrationWizard - isOpen:', isOpen, 'currentStep:', currentStep, 'showBenefits:', showBenefits);
  }, [isOpen, currentStep, showBenefits]);

  const benefits = [
    {
      title: '💼 Asesoría Personalizada',
      description: 'Expertos en distintas áreas te acompañan en cada etapa de tu emprendimiento',
      details: ['Asesoría legal gratuita', 'Consultoría en marketing', 'Apoyo contable', 'Mentoría empresarial']
    },
    {
      title: '💰 Acceso a Financiamiento',
      description: 'Fondos semilla y créditos preferenciales para impulsar tu negocio',
      details: ['Fondos semilla hasta Q50,000', 'Tasas preferenciales', 'Sin garantías hipotecarias', 'Plazos flexibles']
    },
    {
      title: '📚 Capacitación Continua',
      description: 'Talleres y cursos gratuitos para fortalecer tus conocimientos empresariales',
      details: ['Más de 30 talleres anuales', 'Certificaciones reconocidas', '100% gratuitos', 'Modalidad presencial y virtual']
    },
    {
      title: '🤝 Red de Contactos',
      description: 'Conecta con otros emprendedores y genera alianzas estratégicas',
      details: ['Más de 1,200 emprendedores', 'Eventos de networking', 'Ruedas de negocios', 'Bolsa de trabajo']
    },
    {
      title: '🎯 Acceso a Mercados',
      description: 'Te ayudamos a encontrar clientes y expandir tu negocio',
      details: ['Ferias comerciales', 'Catálogo digital', 'Conexión con empresas grandes', 'Exportación']
    }
  ];

  // Determinar si un paso se puede saltar (pasos 3-6 son opcionales)
  const canSkipStep = (step: number) => {
    return step >= 3 && step <= 6;
  };

  // Determinar cuántos pasos tiene este tipo de miembro
  const getTotalSteps = () => {
    if (memberType === 'consumidor') return 2; // Solo pasos 1 y 2
    if (memberType === 'organizacion' || memberType === 'institucion') return 4; // Pasos 1-4
    return 6; // emprendimiento/empresa: todos los pasos
  };

  const handleMemberTypeSelect = (type: string) => {
    setMemberType(type);
    setFormData({ ...formData, member_type: type });
    setCurrentStep(1); // Avanzar al paso 1
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      // Paso 0: selección de tipo
      if (memberType) {
        setCurrentStep(1);
      }
      return;
    }

    // Validar y guardar el paso actual
    setLoading(true);
    setError('');

    try {
      if (currentStep === 1) {
        // Paso 1: Crear cuenta
        // Si el usuario ya está autenticado con Firebase y no proporcionó contraseña,
        // generamos una automáticamente (no la usará, es solo para el backend)
        const dataToSend = { ...formData };
        if (!dataToSend.password) {
          dataToSend.password = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        }
        
        console.log('🚀 Enviando datos del Paso 1:', dataToSend);
        console.log('🌐 Endpoint:', '/registration/paso-1');
        
        const response = await api.post('/registration/paso-1', dataToSend);
        setAuthToken(response.data.token);
        
        // Guardar token en localStorage para las siguientes peticiones
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        // Marcar paso 1 como completado
        const newCompleted = [...completedSteps];
        newCompleted[0] = true;
        setCompletedSteps(newCompleted);
      } else {
        // Pasos 2-6: Actualizar perfil (requieren autenticación)
        await api.post(`/registration/paso-${currentStep}`, formData);

        // Marcar paso como completado
        const newCompleted = [...completedSteps];
        newCompleted[currentStep - 1] = true;
        setCompletedSteps(newCompleted);
      }

      // Avanzar al siguiente paso o finalizar
      if (currentStep < getTotalSteps()) {
        setCurrentStep(currentStep + 1);
      } else {
        // Registro completado
        alert('✅ ¡Registro completado exitosamente!\n\nTu solicitud será revisada por nuestro equipo y recibirás una notificación cuando sea aprobada.');
        onClose();
        resetForm();
      }
    } catch (err: any) {
      console.error('Error al guardar paso:', err);
      setError(err.response?.data?.error || 'Error al procesar el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = async () => {
    if (!canSkipStep(currentStep)) return;

    setLoading(true);
    try {
      await api.post(`/registration/saltar-paso/${currentStep}`, {});

      // Avanzar sin marcar como completado
      if (currentStep < getTotalSteps()) {
        setCurrentStep(currentStep + 1);
      }
    } catch (err: any) {
      console.error('Error al saltar paso:', err);
      setError(err.response?.data?.error || 'Error al saltar paso');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const resetForm = () => {
    setCurrentStep(skipIntro ? 0 : -1);
    setShowBenefits(false);
    setBenefitSlide(0);
    setMemberType(null);
    setFormData({});
    setCompletedSteps([false, false, false, false, false, false]);
    setAuthToken(null);
    setError('');
  };

  const handleStartRegistration = () => {
    setCurrentStep(0); // Ir a selección de tipo
  };

  const handleViewBenefits = () => {
    setShowBenefits(true);
  };

  const handleCloseBenefits = () => {
    setShowBenefits(false);
    setBenefitSlide(0);
  };

  const nextBenefitSlide = () => {
    if (benefitSlide < benefits.length - 1) {
      setBenefitSlide(benefitSlide + 1);
    }
  };

  const prevBenefitSlide = () => {
    if (benefitSlide > 0) {
      setBenefitSlide(benefitSlide - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {currentStep === -1 
                ? '¡Únete al Ecosistema Emprendedor!'
                : 'Registro en el Ecosistema'
              }
            </h1>
            <p className="text-gray-600">
              {currentStep === -1
                ? 'Forma parte del ecosistema de emprendedores, empresas, organizaciones e instituciones'
                : currentStep === 0 
                ? 'Completa tu registro para formar parte de nuestro ecosistema'
                : `Completa la información paso a paso`
              }
            </p>
          </div>

          {/* Barra de progreso (solo visible después de seleccionar tipo) */}
          {currentStep > 0 && (
            <ProgressBar
              currentStep={currentStep}
              totalSteps={getTotalSteps()}
              completedSteps={completedSteps}
            />
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Formularios por paso */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showBenefits ? 'benefits' : currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Pantalla inicial */}
              {currentStep === -1 && !showBenefits && (
                <div className="max-w-2xl mx-auto text-center py-8">
                  <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-5xl">🚀</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      ¿Te interesa formar parte del ecosistema?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Obtén acceso a financiamiento, capacitación, asesoría personalizada y una red de más de 1,200 emprendedores
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleViewBenefits}
                      className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      <span>📖</span>
                      Ver Información
                    </button>
                    <button
                      onClick={handleStartRegistration}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <span>✨</span>
                      Registrarme Ahora
                    </button>
                  </div>
                </div>
              )}

              {/* Carrusel de beneficios */}
              {showBenefits && (
                <div className="max-w-3xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {benefits[benefitSlide].title}
                      </h3>
                      <p className="text-lg text-gray-700 mb-6">
                        {benefits[benefitSlide].description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {benefits[benefitSlide].details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                          <span className="text-green-500 text-xl">✓</span>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Indicadores de slides */}
                    <div className="flex justify-center gap-2 mb-6">
                      {benefits.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setBenefitSlide(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === benefitSlide 
                              ? 'w-8 bg-blue-600' 
                              : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Navegación del carrusel */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={prevBenefitSlide}
                        disabled={benefitSlide === 0}
                        className="px-6 py-2 bg-white rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
                      >
                        ← Anterior
                      </button>
                      
                      <span className="text-sm text-gray-600">
                        {benefitSlide + 1} de {benefits.length}
                      </span>

                      <button
                        onClick={nextBenefitSlide}
                        disabled={benefitSlide === benefits.length - 1}
                        className="px-6 py-2 bg-white rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>

                  {/* Botones finales */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleCloseBenefits}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handleStartRegistration}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      ✨ ¡Quiero Registrarme!
                    </button>
                  </div>
                </div>
              )}

              {/* Selección de tipo y formularios (después de pantalla inicial) */}
              {currentStep >= 0 && (
                <>
                  {currentStep === 0 && (
                    <MemberTypeSelector
                      selected={memberType as any}
                      onSelect={handleMemberTypeSelect}
                    />
                  )}

                  {currentStep === 1 && (
                    <Paso1Form
                      data={formData}
                      onChange={updateFormData}
                      memberType={memberType!}
                    />
                  )}

                  {currentStep === 2 && (
                    <Paso2Form
                      data={formData}
                      onChange={updateFormData}
                      memberType={memberType!}
                    />
                  )}

                  {currentStep === 3 && (
                    <Paso3Form
                      data={formData}
                      onChange={updateFormData}
                      memberType={memberType!}
                    />
                  )}

                  {currentStep === 4 && (
                    <Paso4Form
                      data={formData}
                      onChange={updateFormData}
                      memberType={memberType!}
                    />
                  )}

                  {currentStep === 5 && memberType === 'emprendimiento' && (
                    <Paso5Form
                      data={formData}
                      onChange={updateFormData}
                    />
                  )}

                  {currentStep === 6 && memberType === 'emprendimiento' && (
                    <Paso6Form
                      data={formData}
                      onChange={updateFormData}
                    />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          {currentStep > 0 && (
            <StepNavigation
              currentStep={currentStep}
              totalSteps={getTotalSteps()}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={canSkipStep(currentStep) ? handleSkip : undefined}
              canSkip={canSkipStep(currentStep)}
              loading={loading}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
