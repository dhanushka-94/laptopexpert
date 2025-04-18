"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SortDesc, Laptop } from 'lucide-react';

// Sample data for new laptops
const NEW_LAPTOPS = [
  {
    id: '1',
    title: 'Dell XPS 13 9310 - Intel Core i7 11th Gen',
    imageUrl: '/images/laptops/dell-xps-13.jpg',
    price: 275000,
    originalPrice: 320000,
    condition: 'new' as const,
    specs: {
      processor: 'Intel Core i7-1165G7',
      ram: '16GB LPDDR4x',
      storage: '512GB SSD',
      display: '13.4" FHD+ (1920 x 1200) InfinityEdge',
    },
  },
  {
    id: '3',
    title: 'Lenovo ThinkPad X1 Carbon Gen 9',
    imageUrl: '/images/laptops/thinkpad-x1.jpg',
    price: 310000,
    originalPrice: undefined,
    condition: 'new' as const,
    specs: {
      processor: 'Intel Core i5-1135G7',
      ram: '16GB LPDDR4x',
      storage: '256GB SSD',
      display: '14" FHD (1920 x 1080) IPS Anti-glare',
    },
  },
  {
    id: '4',
    title: 'ASUS ROG Zephyrus G14 - Gaming Laptop',
    imageUrl: '/images/laptops/asus-rog.jpg',
    price: 350000,
    originalPrice: 395000,
    condition: 'new' as const,
    specs: {
      processor: 'AMD Ryzen 9 5900HS',
      ram: '16GB DDR4',
      storage: '1TB NVMe SSD',
      display: '14" QHD 120Hz',
    },
  },
  {
    id: '5',
    title: 'HP EliteBook 840 G8 - Business Laptop',
    imageUrl: '/images/laptops/hp-elitebook.jpg',
    price: 235000,
    originalPrice: 290000,
    condition: 'new' as const,
    specs: {
      processor: 'Intel Core i5-1135G7',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      display: '14" FHD (1920 x 1080) IPS Anti-glare',
    },
  },
];

export default function NewLaptopsPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-8 gap-2">
          <Laptop className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Brand New Laptops</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-muted-foreground max-w-2xl">
            Explore our collection of brand new laptops from top manufacturers, featuring the latest technology and full warranty coverage.
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
          {NEW_LAPTOPS.map((laptop) => (
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