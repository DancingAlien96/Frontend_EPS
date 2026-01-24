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
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-8 md:p-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-4xl text-gray-500 hover:text-gray-800 transition-colors"
        >
          &times;
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Registro de Emprendedor
          </h2>
          <p className="text-gray-600">Completa el formulario para unirte al programa</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold text-[#003d7a] border-b-2 border-[#0066cc] pb-2 mb-6">
            📋 Información Personal
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Nombre Completo <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                DPI <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.dpi}
                onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Teléfono <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Correo Electrónico <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block font-semibold text-gray-700 mb-2">
              Municipio <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.municipio}
              onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">Seleccione...</option>
              {municipios.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-xl font-semibold text-[#003d7a] border-b-2 border-[#0066cc] pb-2 mb-6 mt-8">
            💼 Tu Emprendimiento
          </h3>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Nombre del Negocio <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nombre_negocio}
              onChange={(e) =>
                setFormData({ ...formData, nombre_negocio: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Sector Económico <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">Seleccione...</option>
              {sectores.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Descripción del Negocio <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe brevemente tu emprendimiento..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-vertical"
            />
          </div>

          <div className="mb-8">
            <label className="block font-semibold text-gray-700 mb-2">
              Etapa del Emprendimiento <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.etapa}
              onChange={(e) => setFormData({ ...formData, etapa: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="Idea">Tengo una idea</option>
              <option value="Iniciando">Estoy iniciando</option>
              <option value="Operando">Ya estoy operando</option>
              <option value="Crecimiento">En crecimiento</option>
            </select>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#28a745] text-white rounded-lg font-semibold hover:bg-[#218838] transition-all"
            >
              ✨ Enviar Solicitud
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
