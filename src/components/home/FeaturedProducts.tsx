"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api-util';
import Link from 'next/link';

// Define the product interface
interface Product {
  id: string | number;
  title?: string;
  name?: string;
  image?: string;
  image_url?: string;
  price: number;
  original_price?: number;
  discount_price?: number;
  condition?: 'new' | 'used';
  category?: string;
  specs: string | {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    [key: string]: string;
  };
  slug?: string;
  discount_percentage?: number;
  stock?: number;
}

// Fallback products to display if API completely fails
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1499.99,
    original_price: 1699.99,
    condition: 'new',
    image_url: "/images/products/thinkpad-x1.jpg",
    category: "Laptops",
    specs: {
      processor: "Intel Core i7-1165G7",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "14-inch 4K IPS"
    },
    slug: "lenovo-thinkpad-x1-carbon"
  },
  {
    id: 2,
    name: "MacBook Pro 14-inch",
    price: 1999.99,
    original_price: 2199.99,
    condition: 'new',
    image_url: "/images/products/macbook-pro.jpg",
    category: "Laptops",
    specs: {
      processor: "Apple M2 Pro",
      ram: "16GB Unified Memory",
      storage: "512GB SSD",
      display: "14-inch Liquid Retina XDR"
    },
    slug: "macbook-pro-14"
  },
  {
    id: 3,
    name: "Dell XPS 15",
    price: 1799.99,
    original_price: 1899.99,
    condition: 'new',
    image_url: "/images/products/dell-xps.jpg",
    category: "Laptops",
    specs: {
      processor: "Intel Core i9-12900H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      display: "15.6-inch 4K OLED"
    },
    slug: "dell-xps-15"
  },
  {
    id: 4,
    name: "HP Spectre x360",
    price: 1399.99,
    original_price: 1599.99,
    condition: 'new',
    image_url: "/images/products/hp-spectre.jpg",
    category: "Laptops",
    specs: {
      processor: "Intel Core i7-1255U",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      display: "13.5-inch 3K2K OLED"
    },
    slug: "hp-spectre-x360"
  }
];

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // Get actual products from the API with a limit of 4
        const featuredProducts = await getProducts({ limit: 4 });
        
        if (Array.isArray(featuredProducts) && featuredProducts.length > 0) {
          setProducts(featuredProducts);
        } else {
          console.warn('API returned empty product list, using fallback products');
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (error) {
        console.error('Error loading featured products:', error);
        if (retryCount < maxRetries) {
          // Wait for increasing time before retrying (exponential backoff)
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`Retrying after ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
          
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, delay);
        } else {
          setError('Failed to load products. Please try again later.');
          // Use fallback products instead of showing nothing
          setProducts(FALLBACK_PRODUCTS);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [retryCount]);

  // Function to manually retry loading products
  const handleRetry = () => {
    setRetryCount(0);
  };

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
          <Link
            href="/products"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            View All
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 flex justify-between items-center">
            <p>{error}</p>
            <button 
              onClick={handleRetry} 
              className="ml-4 px-3 py-1 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Show loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-card animate-pulse h-[300px]"></div>
            ))
          ) : products.length > 0 ? (
            // Show products
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                id={String(product.id)}
                title={product.title || product.name || 'Unknown Product'}
                imageUrl={product.image || product.image_url || '/images/placeholder.jpg'}
                price={product.price}
                originalPrice={product.original_price || product.discount_price}
                condition={product.condition || 'new'}
                specs={typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs}
                discountPercentage={product.discount_percentage}
                stock={product.stock}
                category={product.category}
              />
            ))
          ) : (
            // No products found
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No featured products found.</p>
              <button 
                onClick={handleRetry} 
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 