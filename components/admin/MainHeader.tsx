'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Emprendedores', href: '/admin/emprendedores' },
  { name: 'Programas', href: '/admin/programas' },
  { name: 'Eventos', href: '/admin/eventos' },
  { name: 'Solicitudes', href: '/admin/solicitudes' },
  { name: 'Noticias', href: '/admin/noticias' }
];

export default function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin';
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-official-blue flex items-center gap-3">
            <div className="w-16 h-16 bg-official-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Ministerio de</h1>
              <h2 className="text-2xl font-bold leading-tight">Economía</h2>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <FiLogOut size={18} />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>

      <nav className="px-8 flex gap-1 border-t border-gray-100">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-6 py-4 text-sm font-medium transition-all border-b-3 ${
                isActive
                  ? 'text-official-blue border-b-4 border-secondary-blue bg-blue-50'
                  : 'text-gray-600 border-transparent hover:text-official-blue hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
