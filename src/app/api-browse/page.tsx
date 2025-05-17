"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MainLayout } from '@/components/layout/MainLayout';

interface Product {
  id: string;
  item_code: string;
  item_name: string;
  category_id: string;
  category_name: string;
  brand_id: string;
  brand_name: string | null;
  sale_price: string;
  purchase_price: string;
  whole_sale_price: string;
  warranty: string;
  warranty_date: string;
  image?: string;
}

interface CategoryData {
  [category: string]: Product[];
}

export default function ApiBrowsePage() {
  const [data, setData] = useState<any>(null);
  const [categorizedData, setCategorizedData] = useState<CategoryData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Use our proxy endpoint instead of direct API call
        const response = await fetch("/api/proxy");
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        
        // Organize by category
        if (result?.data && Array.isArray(result.data)) {
          const byCategory: CategoryData = {};
          
          result.data.forEach((item: Product) => {
            const category = item.category_name;
            if (!byCategory[category]) {
              byCategory[category] = [];
            }
            byCategory[category].push(item);
          });
          
          setCategorizedData(byCategory);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching API data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">API Data Browser</h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading API data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
              <h2 className="font-semibold mb-2">API Endpoint:</h2>
              <code className="bg-blue-100 p-1 rounded">https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList</code>
              <p className="text-sm text-gray-600 mt-1">(Accessed via server-side proxy to avoid CORS issues)</p>
            </div>
            
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Status:</h2>
              <div className="bg-green-100 p-2 rounded inline-block">
                {data?.status ? `${data.status}` : 'Unknown'}
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Total Categories:</h2>
              <div className="bg-gray-100 p-2 rounded inline-block">
                {Object.keys(categorizedData).length}
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Total Items:</h2>
              <div className="bg-gray-100 p-2 rounded inline-block">
                {data?.data ? data.data.length : 0}
              </div>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Products by Category</h2>
            
            {Object.entries(categorizedData).map(([category, products]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">{category} ({products.length})</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex mb-4">
                        <div className="w-20 h-20 relative flex-shrink-0 bg-gray-100 rounded mr-3">
                          {imageLoadErrors[product.id] ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                              <span className="text-xs">{product.brand_name || 'Product'}</span>
                            </div>
                          ) : (
                            <Image 
                              src={getImageUrl(product)}
                              alt={product.item_name}
                              fill
                              className="object-contain p-1"
                              sizes="80px"
                              onError={() => handleImageError(product.id)}
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-base mb-1 line-clamp-2">{product.item_name}</h4>
                          <div className="text-sm text-gray-600">
                            <div>Brand: {product.brand_name || 'Unknown'}</div>
                            <div>Code: {product.item_code}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm border-t pt-3">
                        <span className="text-gray-500">Price:</span>
                        <span className="font-semibold text-primary">Rs. {parseFloat(product.sale_price).toLocaleString()}</span>
                        
                        {product.warranty !== "0" && (
                          <>
                            <span className="text-gray-500">Warranty:</span>
                            <span className="text-green-600">{product.warranty} {product.warranty_date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 