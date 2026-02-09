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
      <div className="bg-[#1a2332] text-white py-2 px-6 text-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">📞 Línea gratuita: 1500</span>
            <span className="flex items-center gap-2">📧 info@mineco.gob.gt</span>
          </div>
          <div className="flex gap-6">
            <a href="#soporte" className="hover:text-gray-300 transition-colors">Soporte</a>
            <a href="https://www.guatemala.gob.gt" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Portal Gobierno</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Sistema de Emprendedores
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Chiquimula, Guatemala</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav flex items-center gap-1">
              <nav>
                <ul className="flex items-center list-none m-0 p-0 gap-1">
                  {[
                    { key: 'inicio', label: 'Inicio', path: '/' },
                    { key: 'programas', label: 'Programas', path: '/programas' },
                    { key: 'eventos', label: 'Eventos', path: '/eventos' },
                    { key: 'recursos', label: 'Recursos', path: '/recursos' },
                    { key: 'noticias', label: 'Noticias', path: '/noticias' },
                    { key: 'contacto', label: 'Contacto', path: '/contacto' },
                  ].map(item => {
                    const isActive = activeView 
                      ? activeView === item.key 
                      : item.path === '/' 
                        ? pathname === '/' 
                        : pathname?.startsWith(item.path);
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
                          className={`px-4 py-2 text-sm font-medium transition-all relative ${
                            isActive 
                              ? 'text-blue-600' 
                              : 'text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          {item.label}
                          {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              
              {user ? (
                <div className="flex items-center gap-4 ml-4">
                  {/* Notification Icon */}
                  <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all"
                    >
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt={user.displayName || 'Usuario'}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-semibold">
                          {(user.displayName || user.email || 'U')[0].toUpperCase()}
                        </div>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">{user.displayName || 'Usuario'}</p>
                        <p className="text-xs text-gray-500">
                          {userProfile?.rol === 'administrador' || userProfile?.rol === 'superusuario' ? 'Admin' : 'Emprendedor'}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
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
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl font-semibold hover:from-slate-900 hover:to-slate-800 transition-all text-sm shadow-elegant hover:shadow-elegant-lg"
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
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl font-semibold hover:from-slate-900 hover:to-slate-800 transition-all text-center shadow-elegant">
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
                  href="/recursos"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md font-medium text-left transition-all ${
                    pathname === '/recursos'
                      ? 'bg-[#007bff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Recursos
                </Link>
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
