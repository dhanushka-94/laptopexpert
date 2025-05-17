"use client";

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { fetchProducts } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ListFilter } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Get all products
        const allProducts = await fetchProducts({ category: slug });
        setProducts(allProducts);
        
        // Set the category name from the first product if available
        if (allProducts.length > 0 && allProducts[0].category) {
          setCategoryName(allProducts[0].category);
        } else {
          // Format the slug as a display name if no products found
          setCategoryName(slug.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '));
        }
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProducts();
    }
  }, [slug]);

  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
            <p className="text-muted-foreground mt-1">
              {loading ? 'Loading products...' : `${products.length} products found`}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ListFilter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-card animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-muted-foreground mb-8">
              There are currently no products in this category.
            </p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 