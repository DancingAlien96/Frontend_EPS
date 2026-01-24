'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    dpi: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
    municipio: '',
    nombre_negocio: '',
    sector: '',
    descripcion: '',
    etapa: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/registro-emprendedor',
        formData
      );

      alert(
        '✅ ¡Registro exitoso!\n\nTu cuenta ha sido creada. Ahora puedes iniciar sesión.'
      );
      router.push('/auth/login');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Error al registrar. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003d7a] to-[#0066cc] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#003d7a] mb-2">
              Registro de Emprendedor
            </h1>
            <p className="text-gray-600">
              Completa el formulario para crear tu cuenta
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-[#003d7a] border-b-2 border-[#0066cc] pb-3 mb-6">
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
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
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
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Contraseña <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Confirmar Contraseña <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
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
                onChange={(e) =>
                  setFormData({ ...formData, municipio: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
              >
                <option value="">Seleccione...</option>
                {municipios.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <h3 className="text-2xl font-bold text-[#003d7a] border-b-2 border-[#0066cc] pb-3 mb-6 mt-10">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
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
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Describe brevemente tu emprendimiento..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none resize-vertical"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none"
              >
                <option value="">Seleccione...</option>
                <option value="Idea">Tengo una idea</option>
                <option value="Iniciando">Estoy iniciando</option>
                <option value="Operando">Ya estoy operando</option>
                <option value="Crecimiento">En crecimiento</option>
              </select>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Link
                href="/"
                className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#28a745] text-white rounded-lg font-semibold hover:bg-[#218838] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registrando...' : '✨ Crear Cuenta'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/auth/login"
                className="text-[#0066cc] font-semibold hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
