'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  FiHome,
  FiUsers,
  FiBox,
  FiMapPin,
  FiCalendar,
  FiFileText,
  FiMail,
  FiSettings,
  FiLogOut,
  FiMoon,
  FiX
} from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  { name: 'Emprendedores', href: '/admin/emprendedores', icon: FiUsers },
  { name: 'Organizaciones', href: '/admin/organizaciones', icon: FiBox },
  { name: 'Entidades', href: '/admin/entidades', icon: FiMapPin },
  { name: 'Programas', href: '/admin/programas', icon: FiCalendar },
  { name: 'Eventos', href: '/admin/eventos', icon: FiCalendar },
  { name: 'Solicitudes', href: '/admin/solicitudes', icon: FiMail },
  { name: 'Noticias', href: '/admin/noticias', icon: FiFileText },
  { name: 'Configuración', href: '/admin/configuracion', icon: FiSettings }
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isDesktop: boolean;
};

export default function Sidebar({ isOpen, onClose, isDesktop }: SidebarProps) {
  const pathname = usePathname();
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUsuario(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin';
  };

  return (
    <>
      {/* Overlay oscuro - solo móvil */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 shadow-xl flex-col transition-all duration-300 ease-in-out ${
          isDesktop || isOpen ? 'flex' : 'hidden'
        }`}
      >
      <div className="sticky top-0 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo MINECO"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gray-400">Mineco</p>
              <h2 className="text-xl font-bold text-official-blue">Sistema de Gestión</h2>
              <p className="text-sm text-gray-500">Emprendedores</p>
            </div>
          </div>
          {!isDesktop && (
            <button
              className="lg:hidden text-gray-500 hover:text-gray-900 rounded-full p-2"
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <p className="px-3 text-[11px] uppercase tracking-[0.4em] text-gray-400 mt-4 mb-2">Menú</p>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-blue-50 border-blue-200 text-official-blue shadow-sm'
                    : 'border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={onClose}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base ${
                  isActive ? 'border-blue-200 bg-white text-official-blue' : 'border-gray-200 bg-white text-gray-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-6 border-t border-gray-100 space-y-3">
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-gray-200 text-sm text-gray-600 hover:border-official-blue transition">
          <span className="flex items-center gap-2">
            <FiMoon />
            Cambiar tema
          </span>
          <span className="text-gray-400 text-xs">Próximamente</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition"
        >
          <FiLogOut />
          Cerrar sesión
        </button>
      </div>
    </aside>
    </>
  );
}
