"use client";

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SortDesc, Laptop } from 'lucide-react';
import { getProducts } from '@/lib/api-util';

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
  stock?: number;
  discount_percentage?: number;
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
        const allProducts = await getProducts();
        
        // Filter for used laptops - looking for "used" in the category name
        const usedProducts = Array.isArray(allProducts) ? allProducts.filter(product => 
          (product.category && 
           product.category.toLowerCase().includes('used')) ||
          (product.category_name && 
           product.category_name.toLowerCase().includes('used')) ||
          (product.condition && 
           product.condition.toLowerCase() === 'used')
        ) : [];
        
        console.log(`Found ${usedProducts.length} used laptops`);
        
        // Ensure all products are marked as used
        const productsWithUsedCondition = usedProducts.map(product => ({
          ...product,
          condition: 'used' as const
        }));
        
        // Sort by stock status: in-stock first
        productsWithUsedCondition.sort((a, b) => {
          const aInStock = a.stock === undefined || a.stock > 0;
          const bInStock = b.stock === undefined || b.stock > 0;
          
          if (aInStock && !bInStock) return -1; // a is in stock, b is not
          if (!aInStock && bInStock) return 1;  // b is in stock, a is not
          return 0; // both have same stock status
        });
        
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
                stock={laptop.stock}
                category={laptop.category}
                discountPercentage={laptop.discount_percentage}
                slug={laptop.slug}
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