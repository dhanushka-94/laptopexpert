/**
 * Utility functions for making API requests
 */

// Define interfaces
export interface Product {
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
  brand?: string;
  specs: string | {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    [key: string]: string;
  };
  featured?: boolean;
  slug: string;
}

interface FetchProductOptions {
  featured?: boolean;
  category?: string;
  limit?: number;
}

// Function to determine the correct API URL
const getApiUrl = () => {
  // Use environment variable if set
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Check if window is defined (client-side)
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}/api`;
  }
  
  // Fallback for server-side
  return '/api';
};

// Base API URL
const API_URL = getApiUrl();

/**
 * Fetch all products with optional filters
 * @param options - Filter options
 * @returns Array of products
 */
export async function fetchProducts(options: FetchProductOptions = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    
    if (options.featured !== undefined) {
      params.append('featured', options.featured.toString());
    }
    
    if (options.category) {
      params.append('category', options.category);
    }
    
    if (options.limit) {
      params.append('limit', options.limit.toString());
    }
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_URL}/products${queryString}`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

/**
 * Fetch a single product by slug
 * @param slug - Product slug
 * @returns Product object or null if not found
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${slug}`, { cache: 'no-store' });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch featured products
 * @param limit - Maximum number of products to fetch
 * @returns Array of featured products
 */
export async function fetchFeaturedProducts(limit = 4): Promise<Product[]> {
  return fetchProducts({ featured: true, limit });
} 