import { ProductCard } from '@/components/product/ProductCard';

// Sample data for featured products
const FEATURED_PRODUCTS = [
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
];

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Laptops</h2>
            <p className="text-muted-foreground mt-2">
              Discover our handpicked selection of premium laptops
            </p>
          </div>
          <a
            href="/laptops"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            View All
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
} 