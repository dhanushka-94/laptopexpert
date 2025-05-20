"use client";

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  stock?: number;
  discount_percentage?: number;
  category?: string;
  specs: string | {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    [key: string]: string;
  };
}

export default function LaptopsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and filter out services
        const allProducts = await getProducts();
        
        let filteredProducts = Array.isArray(allProducts) ? 
          allProducts.filter(p => 
            !(p.category && p.category.toLowerCase().includes('service'))
          ) : [];
          
        // Sort by stock status: in-stock first
        filteredProducts.sort((a, b) => {
          const aInStock = a.stock === undefined || a.stock > 0;
          const bInStock = b.stock === undefined || b.stock > 0;
          
          if (aInStock && !bInStock) return -1; // a is in stock, b is not
          if (!aInStock && bInStock) return 1;  // b is in stock, a is not
          return 0; // both have same stock status
        });
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = {
    all: products,
    new: products.filter(p => (p.condition || 'new').toLowerCase() === 'new'),
    used: products.filter(p => (p.condition || 'new').toLowerCase() === 'used')
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Laptops</h1>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={handleTabChange}>
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
              {loading ? (
                <LoadingSkeleton />
              ) : filteredProducts.all.length > 0 ? (
                filteredProducts.all.map((product) => (
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
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loading ? (
                <LoadingSkeleton />
              ) : filteredProducts.new.length > 0 ? (
                filteredProducts.new.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={String(product.id)}
                    title={product.title || product.name || 'Unknown Product'}
                    imageUrl={product.image || product.image_url || '/images/placeholder.jpg'}
                    price={product.price}
                    originalPrice={product.original_price || product.discount_price}
                    condition="new"
                    specs={typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs}
                    stock={product.stock}
                    category={product.category}
                    discountPercentage={product.discount_percentage}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No new laptops found.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="used" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loading ? (
                <LoadingSkeleton />
              ) : filteredProducts.used.length > 0 ? (
                filteredProducts.used.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={String(product.id)}
                    title={product.title || product.name || 'Unknown Product'}
                    imageUrl={product.image || product.image_url || '/images/placeholder.jpg'}
                    price={product.price}
                    originalPrice={product.original_price || product.discount_price}
                    condition="used"
                    specs={typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs}
                    stock={product.stock}
                    category={product.category}
                    discountPercentage={product.discount_percentage}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No used laptops found.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {products.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">Load More</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 