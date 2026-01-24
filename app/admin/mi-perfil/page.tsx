"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function MiPerfilPage() {
  const { userProfile, loading } = useAuth();

  if (loading) return <div className="p-6">Cargando perfil...</div>;
  if (!userProfile) return <div className="p-6">No se encontró información de perfil.</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Mi Perfil</h1>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={userProfile.foto_perfil || '/avatar-placeholder.png'}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full object-cover border"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{userProfile.nombre_completo}</h2>
          <p className="text-sm text-gray-600">{userProfile.correo_electronico}</p>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p><strong>Rol:</strong> {userProfile.rol}</p>
            {userProfile.telefono && <p><strong>Teléfono:</strong> {userProfile.telefono}</p>}
            {userProfile.nombre_emprendimiento && (
              <p><strong>Emprendimiento:</strong> {userProfile.nombre_emprendimiento}</p>
            )}
            {userProfile.id_emprendedor && <p><strong>ID emprendedor:</strong> {userProfile.id_emprendedor}</p>}
          </div>

          <div className="mt-6">
            <a href="/admin/mi-perfil/editar" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Editar perfil</a>
          </div>
        </div>
      </div>
    </main>
  );
}
