"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
} 