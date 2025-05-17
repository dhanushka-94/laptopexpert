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
  specs: string | {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    [key: string]: string;
  };
  slug: string;
}

export default function NewLaptopsPage() {
  const [newLaptops, setNewLaptops] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNewLaptops() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all products and filter for new condition
        const allProducts = await fetchProducts();
        
        // Filter for new condition or consider all products as new if condition is not specified
        const newProducts = allProducts.filter(product => 
          !product.condition || product.condition.toLowerCase() === 'new'
        );
        
        console.log(`Found ${newProducts.length} new laptops`);
        setNewLaptops(newProducts);
      } catch (error) {
        console.error('Error loading new laptops:', error);
        setError('Failed to load laptops. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadNewLaptops();
  }, []);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-card animate-pulse h-[300px]"></div>
      ))}
    </>
  );

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

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <LoadingSkeleton />
          ) : newLaptops.length > 0 ? (
            newLaptops.map((laptop) => (
              <ProductCard 
                key={laptop.id}
                id={laptop.slug || String(laptop.id)}
                title={laptop.title || laptop.name || 'Unknown Product'}
                imageUrl={laptop.image || laptop.image_url || '/images/placeholder.jpg'}
                price={laptop.price}
                originalPrice={laptop.original_price || laptop.discount_price}
                condition="new"
                specs={typeof laptop.specs === 'string' ? JSON.parse(laptop.specs) : laptop.specs}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No new laptops found.</p>
            </div>
          )}
        </div>

        {newLaptops.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">Load More</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 