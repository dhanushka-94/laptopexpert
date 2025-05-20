"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function searchProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // Get all products and filter client-side
        const allProducts = await getProducts();
        
        if (!Array.isArray(allProducts)) {
          throw new Error('Failed to fetch products');
        }
        
        // Filter by search term
        let results = allProducts.filter(product => {
          const name = product.name || product.title || '';
          const description = typeof product.specs === 'string' 
            ? product.specs 
            : Object.values(product.specs).join(' ');
          
          const searchText = `${name} ${description} ${product.category || ''}`.toLowerCase();
          return searchText.includes(query.toLowerCase());
        });
        
        // Filter out services
        results = results.filter(product => 
          !(product.category && product.category.toLowerCase().includes('service'))
        );
        
        // Sort by stock status: in-stock first
        results.sort((a, b) => {
          const aInStock = a.stock === undefined || a.stock > 0;
          const bInStock = b.stock === undefined || b.stock > 0;
          
          if (aInStock && !bInStock) return -1; // a is in stock, b is not
          if (!aInStock && bInStock) return 1;  // b is in stock, a is not
          return 0; // both have same stock status
        });
        
        setProducts(results);
      } catch (error) {
        console.error('Error searching products:', error);
        setError('Failed to search products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

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
        <div className="flex items-center mb-6 gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <p className="text-muted-foreground">
            {loading ? 'Searching...' : 
              products.length > 0 
                ? `${products.length} results for "${query}"`
                : `No results found for "${query}"`
            }
          </p>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
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
          ) : products.length > 0 ? (
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
                stock={product.stock}
                category={product.category}
                discountPercentage={product.discount_percentage}
                slug={product.slug}
              />
            ))
          ) : !loading && query ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No products found matching your search.</p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
} 