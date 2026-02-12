'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const municipios = [
  'Chiquimula',
  'Esquipulas',
  'Quetzaltepeque',
  'Camotán',
  'Jocotán',
  'Olopa',
  'San Juan Ermita',
  'Concepción Las Minas',
  'San Jacinto',
  'San José La Arada',
  'Ipala',
];

const sectores = [
  'Agricultura',
  'Comercio',
  'Servicios',
  'Manufactura',
  'Tecnología',
  'Turismo',
  'Alimentos y Bebidas',
  'Textil y Confección',
  'Otro',
];

export default function RegistroModal({ isOpen, onClose }: RegistroModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    dpi: '',
    telefono: '',
    email: '',
    municipio: '',
    nombre_negocio: '',
    sector: '',
    descripcion: '',
    etapa: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Enviar datos al backend
    alert(
      '✅ ¡Solicitud enviada exitosamente!\n\nNuestro equipo revisará tu información y se pondrá en contacto contigo en un plazo máximo de 3 días hábiles.'
    );
    onClose();
    setFormData({
      nombre: '',
      dpi: '',
      telefono: '',
      email: '',
      municipio: '',
      nombre_negocio: '',
      sector: '',
      descripcion: '',
      etapa: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-3xl max-h-[95vh] overflow-y-auto relative my-2 sm:my-4"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 sm:top-4 sm:right-6 text-3xl sm:text-4xl text-gray-500 hover:text-gray-800 transition-colors"
        >
          &times;
        </button>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] mb-1 sm:mb-2">
            Registro de Emprendedor
          </h2>
          <p className="text-sm sm:text-base text-gray-600">Completa el formulario para unirte al programa</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A] border-b-2 border-[#C5A659] pb-2 mb-3 sm:mb-4">
            📋 Información Personal
          </h3>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                Nombre Completo <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                DPI <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.dpi}
                onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                Teléfono <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                Correo Electrónico <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              Municipio <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.municipio}
              onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
            >
              <option value="">Seleccione...</option>
              {municipios.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A] border-b-2 border-[#C5A659] pb-2 mb-3 sm:mb-4 mt-4 sm:mt-6">
            💼 Tu Emprendimiento
          </h3>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              Nombre del Negocio <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nombre_negocio}
              onChange={(e) =>
                setFormData({ ...formData, nombre_negocio: e.target.value })
              }
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              Sector Económico <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
            >
              <option value="">Seleccione...</option>
              {sectores.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              Descripción del Negocio <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe brevemente tu emprendimiento..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300 resize-vertical"
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
              Etapa del Emprendimiento <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.etapa}
              onChange={(e) => setFormData({ ...formData, etapa: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A659] focus:border-[#0F172A] outline-none transition-all duration-300"
            >
              <option value="">Seleccione...</option>
              <option value="Idea">Tengo una idea</option>
              <option value="Iniciando">Estoy iniciando</option>
              <option value="Operando">Ya estoy operando</option>
              <option value="Crecimiento">En crecimiento</option>
            </select>
          </div>

          <div className="flex gap-2 sm:gap-4 justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#0F172A] text-[#0F172A] rounded-lg font-semibold hover:bg-[#F8F8F8] transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-[#065F46] text-white rounded-lg font-semibold hover:bg-[#047857] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              ✨ Enviar Solicitud
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
