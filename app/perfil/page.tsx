"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import ProfileStatusBanner from "@/components/public/ProfileStatusBanner";
import HeroCarousel from "@/components/public/HeroCarousel";
import RegistroModal from "@/components/public/RegistroModal";

export default function PerfilPage() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) return <div className="p-6">Cargando...</div>;

  if (!user) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Perfil</h1>
        <p className="mb-4">No has iniciado sesión. <Link href="/auth/login" className="text-blue-600 underline">Inicia sesión</Link> para ver tu perfil.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Mi Perfil</h1>

      {/* 
        Si el usuario NO tiene perfil en la BD (solo autenticado con Firebase),
        mostrar el carousel invitando a registrarse.
        Si YA tiene perfil (aunque sea incompleto), mostrar el banner de estado.
      */}
      {!userProfile ? (
        <div className="mb-6">
          <HeroCarousel onOpenModal={() => setShowModal(true)} />
          <RegistroModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
          />
        </div>
      ) : (
        <ProfileStatusBanner />
      )}

      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row gap-6 mt-6">
        <div className="flex-shrink-0">
          <img
            src={userProfile?.foto_perfil || user.photoURL || '/avatar-placeholder.png'}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full object-cover border"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{userProfile?.full_name || user.displayName || 'Usuario'}</h2>
          <p className="text-sm text-gray-600">{userProfile?.email || user.email}</p>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p><strong>Rol:</strong> {userProfile?.rol || userProfile?.member_type || 'Usuario'}</p>
            {userProfile?.phone_number && <p><strong>Teléfono:</strong> {userProfile.phone_number}</p>}
            {userProfile?.specific_profile?.nombre_emprendimiento && (
              <p><strong>Emprendimiento:</strong> {userProfile.specific_profile.nombre_emprendimiento}</p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/perfil/editar" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Editar perfil</Link>
            <button onClick={() => signOut()} className="inline-block px-4 py-2 border rounded">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </main>
  );
}
