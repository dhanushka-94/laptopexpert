/**
 * API Utility functions that explicitly specify the HTTP method
 * to avoid "Method Not Allowed" errors
 */

/**
 * Fetches data from the API with explicit GET method
 * @param {string} url - API URL to fetch from
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
export async function fetchData(url, options = {}) {
  return fetch(url, {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {})
    }
  });
}

/**
 * Wrapper for the products API
 * @param {Object} options - Query parameters
 * @returns {Promise<Object>} - JSON response
 */
export async function getProducts(options = {}) {
  const params = new URLSearchParams();
  
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value);
    }
  });
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const response = await fetchData(`${baseUrl}/products${queryString}`, { 
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

/**
 * Wrapper for the specific product API
 * @param {string} slug - Product identifier 
 * @returns {Promise<Object>} - JSON response
 */
export async function getProductBySlug(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  try {
    const response = await fetchData(`${baseUrl}/products/${slug}`, { 
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    throw error;
  }
} 