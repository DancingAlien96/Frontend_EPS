'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Calendar, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import PerfilModal from './PerfilModal';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [showPerfilModal, setShowPerfilModal] = useState(false);

  // Ocultar bottom nav en rutas de admin y auth
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
    return null;
  }

  const navItems = [
    {
      key: 'inicio',
      label: 'Inicio',
      path: '/',
      icon: Home,
    },
    {
      key: 'recursos',
      label: 'Recursos',
      path: '/recursos',
      icon: FileText,
    },
    {
      key: 'eventos',
      label: 'Eventos',
      path: '/eventos',
      icon: Calendar,
    },
    {
      key: 'perfil',
      label: 'Perfil',
      path: user ? '/perfil' : '/auth/login',
      icon: User,
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.key === 'perfil' && user) {
      setShowPerfilModal(true);
    } else {
      router.push(item.path);
    }
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/' 
              ? pathname === '/' 
              : pathname?.startsWith(item.path);
            
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 relative ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-600'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-2 bg-[#003d7a] rounded-2xl -z-10"></div>
                )}
                <Icon 
                  className={`w-6 h-6 ${isActive ? 'fill-white/20' : ''}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modal de perfil */}
      {showPerfilModal && user && (
        <PerfilModal open={showPerfilModal} onClose={() => setShowPerfilModal(false)} />
      )}
    </>
  );
}
