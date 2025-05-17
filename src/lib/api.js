/**
 * Utility functions for making API requests
 */

// Base API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Fetch all products with optional filters
 * @param {Object} options - Filter options
 * @param {boolean} options.featured - Filter by featured status
 * @param {string} options.category - Filter by category slug
 * @param {number} options.limit - Limit number of results
 * @returns {Promise<Array>} - Array of products
 */
export async function fetchProducts(options = {}) {
  try {
    const params = new URLSearchParams();
    
    if (options.featured !== undefined) {
      params.append('featured', options.featured);
    }
    
    if (options.category) {
      params.append('category', options.category);
    }
    
    if (options.limit) {
      params.append('limit', options.limit);
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
 * @param {string} slug - Product slug
 * @returns {Promise<Object|null>} - Product object or null if not found
 */
export async function fetchProductBySlug(slug) {
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
 * @param {number} limit - Maximum number of products to fetch
 * @returns {Promise<Array>} - Array of featured products
 */
export async function fetchFeaturedProducts(limit = 4) {
  return fetchProducts({ featured: true, limit });
} 