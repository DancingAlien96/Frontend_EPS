'use client';

import { useEffect, useState } from 'react';
import { FiBell, FiLogOut, FiMenu } from 'react-icons/fi';
import Image from 'next/image';

type HeaderProps = {
  onToggleSidebar: () => void;
  isDesktop: boolean;
};

export default function Header({ onToggleSidebar, isDesktop }: HeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between gap-6">
        {/* Logo y título izquierda - solo desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo MINECO"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <p className="text-sm font-semibold text-dark-gray leading-tight">Sistema de Gestión</p>
              <p className="text-xs text-gray-500 leading-tight">Emprendedores • Chiquimula</p>
            </div>
          </div>
        </div>

        {/* Título central - solo desktop */}
        <div className="hidden lg:block flex-1 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold">Guatemala • Chiquimula</p>
          <h1 className="text-lg font-semibold text-dark-gray">Sistema de Gestión de Emprendedores</h1>
        </div>

        {/* Mobile: botón menú + título */}
        {!isDesktop && (
          <div className="flex items-center gap-3 flex-1">
          <button
            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-official-blue transition"
            onClick={onToggleSidebar}
            aria-label="Abrir menú"
          >
            <FiMenu size={18} />
          </button>
          <Image
            src="/logo.png"
            alt="Logo"
            width={35}
            height={35}
            className="object-contain"
          />
          <div>
            <p className="text-xs font-semibold text-dark-gray">Sistema de Gestión</p>
            <p className="text-[10px] text-gray-500">Emprendedores</p>
          </div>
        </div>
        )}

        {/* Acciones derecha */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-600 hover:text-official-blue hover:bg-blue-50 rounded-full transition" aria-label="Notificaciones">
            <FiBell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-800 leading-tight">{user?.nombre_completo || 'Administrador MINECO'}</p>
              <p className="text-[10px] text-gray-500 leading-tight">{user?.correo_electronico || 'admin@mineco.gob.gt'}</p>
            </div>
            <div className="w-9 h-9 bg-official-blue rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.nombre_completo?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
