'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '@/lib/axios';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('\n═══════════════════════════════════════');
    console.log('🚀 FRONTEND - Iniciando login');
    console.log('Datos a enviar:', { correo: formData.correo_electronico, password: '***' });

    try {
      console.log('📤 Enviando petición al backend...');
      const response = await api.post('/auth/login', formData);
      console.log('✅ Respuesta recibida del backend');
      console.log('Token:', response.data.token ? 'RECIBIDO' : 'NO RECIBIDO');
      console.log('Usuario:', response.data.usuario);
      
      console.log('💾 Guardando en localStorage...');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      console.log('✓ Token guardado en localStorage');
      console.log('✓ Usuario guardado en localStorage');
      
      console.log('🔄 Redirigiendo a /admin/dashboard...');
      console.log('═══════════════════════════════════════\n');
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      console.log('❌ ERROR en login');
      console.error('Detalle del error:', err);
      console.log('Respuesta del servidor:', err.response?.data);
      console.log('═══════════════════════════════════════\n');
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url(/fondo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-official-blue/40 backdrop-blur-sm"></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-official-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-official-blue mb-2">Panel de Administración</h1>
          <p className="text-gray-600 text-base">Sistema de Emprendedores - Chiquimula</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue text-gray-900 placeholder-gray-400"
              placeholder="usuario@mineco.gob.gt"
              value={formData.correo_electronico}
              onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue text-gray-900 placeholder-gray-400"
                placeholder="••••••••"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg mt-6"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="font-medium">© 2026 Ministerio de Economía</p>
          <p className="mt-1">Departamento de Chiquimula</p>
        </div>
      </div>
    </div>
  );
}
