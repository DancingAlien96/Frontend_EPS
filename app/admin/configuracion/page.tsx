'use client';

import { useState, useEffect } from 'react';
import { FiUser, FiLock, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import api from '@/lib/axios';

export default function ConfiguracionPage() {
  const [usuario, setUsuario] = useState({
    id_usuario: 0,
    nombre_completo: '',
    correo_electronico: '',
    telefono: '',
    institucion: '',
    rol: '',
    foto_perfil: ''
  });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUsuario(user);
    }
  }, []);

  const handleFotoChange = async (url: string) => {
    try {
      setGuardando(true);
      await api.put(`/usuarios/${usuario.id_usuario}`, {
        foto_perfil: url
      });
      
      const updatedUser = { ...usuario, foto_perfil: url };
      setUsuario(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Foto de perfil actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar foto:', error);
      alert('Error al actualizar la foto de perfil');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración</h1>
        <p className="text-gray-600">Administra tu perfil y preferencias del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Foto de Perfil</h2>
            
            <div className="flex items-center gap-6">
              {usuario.foto_perfil && (
                <img 
                  src={usuario.foto_perfil} 
                  alt={usuario.nombre_completo}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              )}
              <div className="flex-1">
                <CloudinaryUpload
                  label="Cambiar foto de perfil"
                  value={usuario.foto_perfil}
                  onChange={handleFotoChange}
                  helper="Tamaño máximo: 5MB. Formatos: JPG, PNG"
                />
                {guardando && (
                  <p className="text-sm text-blue-600 mt-2">Guardando...</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="inline mr-2" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  value={usuario.nombre_completo}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMail className="inline mr-2" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  value={usuario.correo_electronico}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="inline mr-2" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  value={usuario.telefono || ''}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiBriefcase className="inline mr-2" />
                  Institución
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  value={usuario.institucion || ''}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cambiar Contraseña</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiLock className="inline mr-2" />
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  placeholder="••••••••"
                />
              </div>

              <button className="w-full bg-official-blue text-white py-2 rounded-lg hover:bg-secondary-blue transition">
                Actualizar Contraseña
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Sistema</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Rol:</span>
                <span className="font-medium capitalize">{usuario.rol}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium text-green-600">Activo</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Versión:</span>
                <span className="font-medium">1.0.0</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Soporte Técnico</h3>
            <p className="text-sm text-blue-700 mb-3">
              Si necesitas ayuda o tienes algún problema, contáctanos:
            </p>
            <p className="text-sm text-blue-800 font-medium">
              soporte@mineco.gob.gt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
