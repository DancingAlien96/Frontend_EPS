'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/public/Footer';

export default function FooterWrapper() {
  const pathname = usePathname() || '/';
  // Hide footer on auth routes (login/register), on admin pages, and on the standalone "volverme emprendedor" page
  if (pathname.startsWith('/auth') || pathname.startsWith('/admin') || pathname === '/volverme-emprendedor') return null;
  return <Footer />;
}
