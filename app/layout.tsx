import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@uploadthing/react/styles.css";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/public/Footer';
import FooterWrapper from '@/components/layout/FooterWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <HeaderWrapper />
          {children}
          {/* Footer: rendered via FooterWrapper which hides on auth routes */}
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
