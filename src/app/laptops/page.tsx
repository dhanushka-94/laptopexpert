import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, SortDesc, Laptop } from 'lucide-react';

// Sample data for laptops
const LAPTOPS = [
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
  {
    id: '8',
    title: 'MSI GF65 Thin - Gaming Laptop',
    imageUrl: '/images/laptops/msi-gf65.jpg',
    price: 310000,
    originalPrice: undefined,
    condition: 'new' as const,
    specs: {
      processor: 'Intel Core i7-10750H',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD 144Hz',
    },
  },
];

export default function LaptopsPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-8 gap-2">
          <Laptop className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Laptops</h1>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="bg-card">
              <TabsTrigger value="all">All Laptops</TabsTrigger>
              <TabsTrigger value="new">Brand New</TabsTrigger>
              <TabsTrigger value="used">Used</TabsTrigger>
            </TabsList>

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

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {LAPTOPS.map((laptop) => (
                <ProductCard key={laptop.id} {...laptop} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {LAPTOPS.filter(laptop => laptop.condition === 'new').map((laptop) => (
                <ProductCard key={laptop.id} {...laptop} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="used" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {LAPTOPS.filter(laptop => laptop.condition === 'used').map((laptop) => (
                <ProductCard key={laptop.id} {...laptop} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">Load More</Button>
        </div>
      </div>
    </MainLayout>
  );
} 