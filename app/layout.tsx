import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "@uploadthing/react/styles.css";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/public/Footer';
import FooterWrapper from '@/components/layout/FooterWrapper';
import BottomNav from '@/components/public/BottomNav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Sistema de Emprendedores - Chiquimula",
  description: "Sistema de apoyo al desarrollo empresarial en Chiquimula, Guatemala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <AuthProvider>
          <HeaderWrapper />
          <div className="pb-16 md:pb-0">
            {children}
          </div>
          {/* Footer: rendered via FooterWrapper which hides on auth routes */}
          <FooterWrapper />
          {/* Bottom Navigation for mobile */}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
