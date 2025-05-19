"use client";

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SortDesc, Laptop } from 'lucide-react';
import { fetchProducts } from '@/lib/api';

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
  category_name?: string;
  specs: string | {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    [key: string]: string;
  };
  slug: string;
}

export default function UsedLaptopsPage() {
  const [usedLaptops, setUsedLaptops] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsedLaptops() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all products
        const allProducts = await fetchProducts();
        
        // Filter for used laptops - look for products in USED LAPTOPS category
        const usedProducts = allProducts.filter(product => 
          product.category_name && 
          product.category_name.toUpperCase().includes('USED')
        );
        
        console.log(`Found ${usedProducts.length} used laptops with category containing 'USED'`);
        
        // Ensure all products are marked as used
        const productsWithUsedCondition = usedProducts.map(product => ({
          ...product,
          condition: 'used' as const
        }));
        
        setUsedLaptops(productsWithUsedCondition);
      } catch (error) {
        console.error('Error loading used laptops:', error);
        setError('Failed to load laptops. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadUsedLaptops();
  }, []);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-card animate-pulse h-[300px]"></div>
      ))}
    </>
  );

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

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <LoadingSkeleton />
          ) : usedLaptops.length > 0 ? (
            usedLaptops.map((laptop) => (
              <ProductCard 
                key={laptop.id}
                id={laptop.slug || String(laptop.id)}
                title={laptop.title || laptop.name || 'Unknown Product'}
                imageUrl={laptop.image || laptop.image_url || '/images/placeholder.jpg'}
                price={laptop.price}
                originalPrice={laptop.original_price || laptop.discount_price}
                condition="used"
                specs={typeof laptop.specs === 'string' ? JSON.parse(laptop.specs) : laptop.specs}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No used laptops found.</p>
            </div>
          )}
        </div>

        {usedLaptops.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">Load More</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 