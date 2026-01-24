'use client';

import { usePathname } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import Footer from '@/components/public/Footer';

export default function HeaderWrapper() {
  const pathname = usePathname() || '/';

  // Hide header on auth and admin routes
  const hide = pathname.startsWith('/auth') || pathname.startsWith('/admin');

  if (hide) return null;

  return (
    <>
      <PublicHeader />
      {/* Footer will be placed after page content via layout; keep Footer accessible here */}
    </>
  );
}
