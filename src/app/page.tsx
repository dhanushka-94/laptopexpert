"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

// Add placeholder images
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Fix for demonstration purposes: Create CSS to provide fallback background colors
    const style = document.createElement('style');
    style.innerHTML = `
      .hero-bg-fallback {
        background: linear-gradient(to right, #0f172a, #1e293b);
      }
      .product-image-fallback {
        background: linear-gradient(to right, #1e293b, #334155);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProducts />
      <ServicesSection />
      <TestimonialsSection />
    </MainLayout>
  );
}
