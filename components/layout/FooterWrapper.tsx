'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/public/Footer';

export default function FooterWrapper() {
  const pathname = usePathname() || '/';
  // Hide footer on auth routes (login/register) and on admin pages
  if (pathname.startsWith('/auth') || pathname.startsWith('/admin')) return null;
  return <Footer />;
}
