"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SortDesc, Laptop } from 'lucide-react';

// Sample data for used laptops
const USED_LAPTOPS = [
  {
    id: '2',
    title: 'MacBook Pro 14" M1 Pro - Slightly Used',
    imageUrl: '/images/laptops/macbook-pro-14.jpg',
    price: 420000,
    originalPrice: 580000,
    condition: 'used' as const,
    specs: {
      processor: 'Apple M1 Pro 8-core',
      ram: '16GB Unified',
      storage: '512GB SSD',
      display: '14.2" Liquid Retina XDR (3024 x 1964)',
    },
  },
  {
    id: '6',
    title: 'Acer Swift 3 - Used, Excellent Condition',
    imageUrl: '/images/laptops/acer-swift.jpg',
    price: 125000,
    originalPrice: 195000,
    condition: 'used' as const,
    specs: {
      processor: 'AMD Ryzen 5 4500U',
      ram: '8GB LPDDR4x',
      storage: '512GB SSD',
      display: '14" FHD (1920 x 1080) IPS',
    },
  },
  {
    id: '7',
    title: 'Microsoft Surface Laptop 4 - Certified Refurbished',
    imageUrl: '/images/laptops/surface-laptop.jpg',
    price: 280000,
    originalPrice: 350000,
    condition: 'used' as const,
    specs: {
      processor: 'AMD Ryzen 7 Microsoft Surface Edition',
      ram: '16GB LPDDR4x',
      storage: '512GB SSD',
      display: '15" PixelSense (2496 x 1664) Touchscreen',
    },
  },
];

export default function UsedLaptopsPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-8 gap-2">
          <Laptop className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Used Laptops</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-muted-foreground max-w-2xl">
            Browse our selection of quality used and refurbished laptops. Each device has been thoroughly tested and comes with a warranty for your peace of mind.
          </p>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <SortDesc className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {USED_LAPTOPS.map((laptop) => (
            <ProductCard key={laptop.id} {...laptop} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">Load More</Button>
        </div>
      </div>
    </MainLayout>
  );
} 