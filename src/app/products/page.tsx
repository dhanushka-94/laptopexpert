"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from '@/components/layout/MainLayout';

interface Product {
  id: string;
  item_code: string;
  item_name: string;
  category_id: string;
  category_name: string;
  brand_name: string | null;
  sale_price: string;
  purchase_price: string;
  whole_sale_price: string;
  warranty: string;
  warranty_date: string;
  image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use our proxy endpoint instead of direct API call
        const response = await fetch("/api/proxy");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        
        if (data.status === 200 && Array.isArray(data.data)) {
          setProducts(data.data);
          
          // Extract unique categories with proper type assertion
          const uniqueCategories = [...new Set(data.data.map((product: Product) => product.category_name))] as string[];
          setCategories(uniqueCategories);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to get brand-specific image or placeholder
  const getImageUrl = (product: Product) => {
    try {
      // Check if product has an image URL
      if (product.image) {
        // Handle different image URL formats
        if (product.image.startsWith('http')) {
          return product.image;
        } else if (product.image.startsWith('/')) {
          return product.image;
        } else {
          return `/${product.image}`;
        }
      }
      
      // Check if brand_name exists
      if (!product.brand_name) return '/images/placeholder.jpg';
      
      // Generate a brand-based placeholder
      const brandMap: {[key: string]: string} = {
        'HP': '/images/brands/hp.png',
        'DELL': '/images/brands/dell.png',
        'LENOVO': '/images/brands/lenovo.png',
        'ASUS': '/images/brands/asus.png',
        'MSI': '/images/brands/msi.png',
        'ACER': '/images/brands/acer.png',
        'APPLE': '/images/brands/apple.png',
        'SAMSUNG': '/images/brands/samsung.png',
        'TOSHIBA': '/images/brands/toshiba.png',
      };
      
      return brandMap[product.brand_name.toUpperCase()] || '/images/placeholder.jpg';
    } catch (error) {
      console.error("Error getting image URL:", error);
      return '/images/placeholder.jpg';
    }
  };

  const handleImageError = (productId: string) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Products</h1>
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading products...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Products</h1>
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Products by Category</h1>
        
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products
                .filter((product) => product.category_name === category)
                .map((product) => (
                  <Link 
                    href={`/product/${product.id}`} 
                    key={product.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative h-48">
                      <div className="flex items-center justify-center h-full">
                        {imageLoadErrors[product.id] ? (
                          // Show fallback placeholder if image fails to load
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                            <span className="text-sm">{product.brand_name || 'Product'}</span>
                          </div>
                        ) : (
                          <Image 
                            src={getImageUrl(product)}
                            alt={product.item_name}
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                            onError={() => handleImageError(product.id)}
                          />
                        )}
                      </div>
                      {product.brand_name && !imageLoadErrors[product.id] && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                          <Image 
                            src={`/images/brands/${product.brand_name.toLowerCase()}.png`}
                            alt={product.brand_name}
                            width={24}
                            height={24}
                            className="object-contain"
                            onError={(e) => {
                              // Hide the brand logo if it fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 truncate">{product.item_name}</h3>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{product.brand_name || 'Unknown'}</span>
                        <span>Code: {product.item_code}</span>
                      </div>
                      
                      <div className="space-y-1 mt-3">
                        <div className="text-lg font-bold text-primary">
                          Rs. {parseFloat(product.sale_price).toLocaleString()}
                        </div>
                        
                        {product.whole_sale_price && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Wholesale: </span>
                            <span>Rs. {parseFloat(product.whole_sale_price).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      
                      {product.warranty !== "0" && (
                        <div className="text-sm text-green-600 mt-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>{product.warranty} {product.warranty_date} warranty</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
} 