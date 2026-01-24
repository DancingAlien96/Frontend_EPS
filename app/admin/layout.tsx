'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token && !isLoginPage) {
      router.push('/admin');
      setLoading(false);
      return;
    }
    
    if (token && isLoginPage) {
      router.push('/admin/dashboard');
      setLoading(false);
      return;
    }
    
    setIsAuthenticated(!!token);
    setLoading(false);
  }, [pathname, isLoginPage, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    }
  }, [isDesktop]);

  if (loading) {
    return null;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-gray flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isDesktop={isDesktop} />
      <div className="flex-1 min-h-screen flex flex-col lg:ml-72">
        <Header onToggleSidebar={() => setSidebarOpen(true)} isDesktop={isDesktop} />
        <main className="flex-1 px-3 sm:px-4 lg:px-10 py-4 sm:py-6 lg:py-8 w-full bg-light-gray">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
