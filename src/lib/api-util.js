/**
 * API Utility functions that explicitly specify the HTTP method
 * to avoid "Method Not Allowed" errors
 */

/**
 * Get the current base URL depending on the environment
 * @returns {string} - API base URL
 */
export function getBaseUrl() {
  // Check if we're running on the client or server side
  const isClient = typeof window !== 'undefined';
  
  if (isClient) {
    // In browser - use current origin with /api path
    return `${window.location.origin}/api`;
  }
  
  // In server context, use environment variable or fallback to localhost
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
}

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
 * Wrapper for the products API with fallback to proxy
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
  const baseUrl = getBaseUrl();
  
  try {
    console.log(`Fetching products from: ${baseUrl}/products${queryString}`);
    let response = await fetchData(`${baseUrl}/products${queryString}`, { 
      cache: 'no-store' 
    });
    
    // If the main API fails, try the proxy fallback
    if (!response.ok) {
      console.warn(`Main API request failed with status: ${response.status}. Trying fallback proxy...`);
      
      // Use the proxy endpoint as fallback
      response = await fetchData(`${baseUrl}/proxy`, { 
        cache: 'no-store' 
      });
      
      if (!response.ok) {
        throw new Error(`Both main API and fallback proxy failed. Status: ${response.status}`);
      }
      
      console.log('Successfully fetched data from fallback proxy');
      const proxyData = await response.json();
      
      // The proxy returns data in a different format, handle it
      if (proxyData && proxyData.data && Array.isArray(proxyData.data)) {
        return proxyData.data;
      }
      
      return proxyData; // Just return whatever we got
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return empty array instead of throwing to avoid breaking the UI
    return [];
  }
}

/**
 * Wrapper for the specific product API
 * @param {string} slug - Product identifier 
 * @returns {Promise<Object>} - JSON response
 */
export async function getProductBySlug(slug) {
  const baseUrl = getBaseUrl();
  
  try {
    console.log(`Fetching product details from: ${baseUrl}/products/${slug}`);
    const response = await fetch(`${baseUrl}/products/${slug}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
    return null; // Return null instead of throwing
  }
} 