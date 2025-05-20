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
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        // Get actual products from the API with a limit of 4
        const featuredProducts = await getProducts({ limit: 4 });
        setProducts(Array.isArray(featuredProducts) ? featuredProducts : []);
      } catch (error) {
        console.error('Error loading featured products:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

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
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            <p>{error}</p>
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
              />
            ))
          ) : (
            // No products found
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No featured products found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 