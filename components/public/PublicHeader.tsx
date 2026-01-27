'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PerfilModal from './PerfilModal';
import { usePathname, useRouter } from 'next/navigation';

interface PublicHeaderProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

export default function PublicHeader({ activeView, onViewChange }: PublicHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [mobileUserOpen, setMobileUserOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#003d7a] text-white py-2 px-6 text-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex gap-5">
            <span>📞 Línea gratuita: 1500</span>
            <span>📧 info@mineco.gob.gt</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Logo Sistema de Emprendedores"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
              <div>
                <h1 className="text-2xl font-bold text-[#003d7a]">
                  Sistema de Emprendedores
                </h1>
                <p className="text-sm text-gray-600">Chiquimula, Guatemala</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <nav>
                <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '8px' }}>
                  {[
                    { key: 'inicio', label: 'Inicio', path: '/' },
                    { key: 'programas', label: 'Programas', path: '/programas' },
                    { key: 'eventos', label: 'Eventos', path: '/eventos' },
                    { key: 'noticias', label: 'Noticias', path: '/noticias' },
                    { key: 'contacto', label: 'Contacto', path: '/contacto' },
                  ].map(item => {
                    const isActive = activeView ? activeView === item.key : pathname?.startsWith(item.path);
                    return (
                      <li key={item.key}>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            if (onViewChange) {
                              onViewChange?.(item.key);
                            } else {
                              router.push(item.path);
                            }
                          }}
                          style={{
                            padding: '8px 20px',
                            borderRadius: '6px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: isActive ? '#007bff' : 'transparent',
                            color: isActive ? 'white' : '#1a1a1a',
                          }}
                          className={!isActive ? 'hover:bg-[#007bff] hover:text-white transition-all' : ''}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              
              {user ? (
                <div className="relative" style={{ marginLeft: '16px' }}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-all"
                  >
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'Usuario'}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-[#007bff]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#007bff] text-white flex items-center justify-center font-bold">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-gray-700 font-semibold hidden lg:block">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">
                          {user.displayName || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        📊 Mi Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setShowPerfilModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        👤 Mi Perfil
                      </button>
                      <button
                        onClick={async () => {
                          await signOut();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  style={{
                    padding: '8px 24px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    borderRadius: '6px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'inline-block',
                    marginLeft: '16px'
                  }}
                  className="hover:bg-[#218838] transition-all"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
            {/* Perfil modal */}
            {showPerfilModal && (
              // dynamically import to avoid SSR issues if any (component is client anyway)
              <PerfilModal open={showPerfilModal} onClose={() => setShowPerfilModal(false)} />
            )}

            {/* Mobile Auth / Avatar */}


            {/* Hamburger Menu Button Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-hamburger p-2 text-gray-700 hover:text-[#007bff]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu px-6 pb-4 border-t border-gray-200">
              <nav className="flex flex-col gap-2 mt-4">
                {/* Login or user header at top (mobile) */}
                {!user ? (
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 bg-[#28a745] text-white rounded-md font-semibold hover:bg-[#218838] transition-all text-center">
                    Iniciar Sesión
                  </Link>
                ) : (
                  <div>
                    <button type="button" onClick={() => setMobileUserOpen(prev => !prev)} className="flex items-center gap-3 px-4 py-3 w-full text-left">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#007bff]">
                        {user.photoURL ? (
                          <Image src={user.photoURL} alt={user.displayName || 'Usuario'} width={40} height={40} className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#007bff] text-white flex items-center justify-center font-bold">{(user.displayName || user.email || 'U')[0].toUpperCase()}</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{user.displayName || 'Usuario'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <svg className={`w-4 h-4 text-gray-600 transition-transform ${mobileUserOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileUserOpen && (
                      <div className="pl-12 flex flex-col gap-2 mt-2">
                        <Link href="/dashboard" onClick={() => { setMenuOpen(false); setMobileUserOpen(false); }} className="px-4 py-3 bg-[#f3f4f6] rounded-md text-sm font-medium">📊 Mi Dashboard</Link>
                        <button onClick={() => { setShowPerfilModal(true); setMenuOpen(false); setMobileUserOpen(false); }} className="px-4 py-3 bg-[#f3f4f6] rounded-md text-sm font-medium text-left">👤 Mi Perfil</button>
                        <button onClick={async () => { await signOut(); setMenuOpen(false); setMobileUserOpen(false); }} className="px-4 py-3 bg-red-50 text-red-600 rounded-md text-sm font-medium">🚪 Cerrar Sesión</button>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => {
                    onViewChange?.('inicio');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md font-medium text-left transition-all ${
                    activeView === 'inicio'
                      ? 'bg-[#007bff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => {
                    onViewChange?.('programas');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md font-medium text-left transition-all ${
                    activeView === 'programas'
                      ? 'bg-[#007bff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Programas
                </button>
                <button
                  onClick={() => {
                    onViewChange?.('eventos');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md font-medium text-left transition-all ${
                    activeView === 'eventos'
                      ? 'bg-[#007bff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Eventos
                </button>
                <Link
                  href="/noticias"
                  onClick={() => {
                    onViewChange?.('noticias');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md font-medium text-left transition-all ${
                    activeView === 'noticias'
                      ? 'bg-[#007bff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Noticias
                </Link>
                <button
                  onClick={() => {
                    onViewChange?.('contacto');
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md font-medium text-left transition-all ${
                    activeView === 'contacto'
                      ? 'bg-[#007bff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Contacto
                </button>

              </nav>
            </div>
          )}
      </header>
    </>
  );
}
