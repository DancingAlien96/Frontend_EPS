"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function PerfilModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, userProfile, loading } = useAuth();
  const role = (userProfile?.rol || '').toString().toLowerCase();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-2xl p-6 z-60">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">Mi Perfil</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        {loading ? (
          <div className="p-6">Cargando...</div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-4 items-start">
            <div>
              <img
                src={userProfile?.foto_perfil || user?.photoURL || '/avatar-placeholder.png'}
                alt="Foto de perfil"
                className="w-28 h-28 rounded-full object-cover border"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{userProfile?.nombre_completo || user?.displayName || 'Usuario'}</h3>
              <p className="text-sm text-gray-600">{userProfile?.correo_electronico || user?.email}</p>

              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <p><strong>Rol:</strong> {userProfile?.rol || 'Usuario'}</p>
                {userProfile?.telefono && <p><strong>Teléfono:</strong> {userProfile.telefono}</p>}
                {userProfile?.nombre_emprendimiento && <p><strong>Emprendimiento:</strong> {userProfile.nombre_emprendimiento}</p>}
              </div>

              <div className="mt-6 flex gap-3">
                <a href="/perfil/editar" className="px-4 py-2 bg-blue-600 text-white rounded">Editar perfil</a>
                <button onClick={onClose} className="px-4 py-2 border rounded">Cerrar</button>
              </div>

              {role === 'usuario' && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                  <h4 className="text-lg font-semibold">¿Quieres ser emprendedor?</h4>
                  <p className="text-sm text-gray-600 mt-1">Completa una breve encuesta para verificar tu emprendimiento y acceder a herramientas especiales.</p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="/emprendedor/encuesta"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded shadow"
                    >
                      Volverme emprendedor
                    </a>
                    <a href="/emprendedor/info" className="px-4 py-2 border rounded">Más info</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
