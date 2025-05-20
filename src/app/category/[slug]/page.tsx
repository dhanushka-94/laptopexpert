"use client";

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api-util';
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
  slug: string;
  stock?: number;
  discount_percentage?: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

// Filter helper function to avoid TypeScript errors
const categoryMatches = (product: Product, categoryName: string): boolean => {
  if (!product.category) return false;
  
  const productCategory = product.category.toLowerCase();
  const searchCategory = categoryName.toLowerCase();
  
  return productCategory.includes(searchCategory) || searchCategory.includes(productCategory);
};

const wordBasedCategoryMatches = (product: Product, categoryWords: string[]): boolean => {
  if (!product.category) return false;
  
  const productCategory = product.category.toLowerCase();
  return categoryWords.some(word => word.length > 2 && productCategory.includes(word));
};

export default function CategoryPage() {
  const params = useParams();
  const slugParam = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>('');
  
  // Format the slug as a display name
  const formatSlugName = (slug: string) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        // First fetch all categories to get the exact category name from slug
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const categories: Category[] = await categoriesResponse.json();
        console.log("Available categories from API:", categories);
        const category = categories.find(cat => cat.slug === slugParam);
        
        if (category) {
          // Use the exact category name from the API
          setCategoryName(category.name);
          await loadProducts(category.name);
        } else {
          // If category not found, use formatted slug name
          const formattedName = formatSlugName(slugParam);
          setCategoryName(formattedName);
          await loadProducts(formattedName);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback to using the formatted slug
        const formattedName = formatSlugName(slugParam);
        setCategoryName(formattedName);
        await loadProducts(formattedName);
      }
    }

    async function loadProducts(categoryName: string) {
      try {
        setLoading(true);
        // First try to get products using the API's category filter
        let products = await getProducts({ category: categoryName });
        let productArray = Array.isArray(products) ? products : [];
        
        console.log(`Products fetched using API category parameter: ${productArray.length}`);
        
        // If no products found, fall back to client-side filtering with more flexible matching
        if (productArray.length === 0) {
          console.log(`No products from API, trying client-side filtering for category: "${categoryName}"`);
          const allProducts = await getProducts();
          const allProductsArray = Array.isArray(allProducts) ? allProducts : [];
          
          console.log(`Total products fetched: ${allProductsArray.length}`);
          
          // Log the available categories for debugging
          const availableCategories = [...new Set(allProductsArray
            .map(p => p.category)
            .filter(Boolean as unknown as (value: string | undefined) => value is string))];
          console.log(`Available categories: ${JSON.stringify(availableCategories)}`);
          
          // Try more flexible matching (includes instead of exact match)
          productArray = allProductsArray.filter(product => categoryMatches(product, categoryName));
          
          console.log(`Found ${productArray.length} products with flexible category matching`);
          
          // If still no results, try matching words
          if (productArray.length === 0) {
            const categoryWords = categoryName.toLowerCase().split(/\s+/);
            productArray = allProductsArray.filter(product => wordBasedCategoryMatches(product, categoryWords));
            console.log(`Found ${productArray.length} products with word-based matching`);
          }
        }
        
        setProducts(productArray);
      } catch (error) {
        console.error('Error loading category products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    if (slugParam) {
      loadCategories();
    }
  }, [slugParam]);

  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/laptops" 
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
                id={product.slug || String(product.id)}
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
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
            <p className="text-muted-foreground mb-8">
              There are currently no products in the {categoryName} category.
            </p>
            <Button asChild>
              <Link href="/laptops">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 