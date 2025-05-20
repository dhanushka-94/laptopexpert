import { NextResponse } from 'next/server';

// Sample data as a fallback if the external API is unavailable
const FALLBACK_DATA = [
  {
    id: 1,
    name: "Lenovo ThinkPad X1 Carbon",
    item_code: "L-TP-X1C",
    slug: "lenovo-thinkpad-x1-carbon",
    price: 1499.99,
    original_price: 1699.99,
    discount_price: 1499.99,
    category: "Laptops",
    brand: "Lenovo",
    image_url: "/images/products/thinkpad-x1.jpg",
    specs: {
      processor: "Intel Core i7-1165G7",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "14-inch 4K IPS",
      warranty: "1 Year"
    }
  },
  {
    id: 2,
    name: "MacBook Pro 14-inch",
    item_code: "A-MB-P14",
    slug: "macbook-pro-14",
    price: 1999.99,
    original_price: 2199.99,
    discount_price: 1999.99,
    category: "Laptops",
    brand: "Apple",
    image_url: "/images/products/macbook-pro.jpg",
    specs: {
      processor: "Apple M2 Pro",
      ram: "16GB Unified Memory",
      storage: "512GB SSD",
      display: "14-inch Liquid Retina XDR",
      warranty: "1 Year"
    }
  },
  {
    id: 3,
    name: "Dell XPS 15",
    item_code: "D-XPS-15",
    slug: "dell-xps-15",
    price: 1799.99,
    original_price: 1899.99,
    discount_price: 1799.99,
    category: "Laptops",
    brand: "Dell",
    image_url: "/images/products/dell-xps.jpg",
    specs: {
      processor: "Intel Core i9-12900H",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      display: "15.6-inch 4K OLED",
      warranty: "2 Years"
    }
  },
  {
    id: 4,
    name: "HP Spectre x360",
    item_code: "HP-SP-X360",
    slug: "hp-spectre-x360",
    price: 1399.99,
    original_price: 1599.99,
    discount_price: 1399.99,
    category: "Laptops",
    brand: "HP",
    image_url: "/images/products/hp-spectre.jpg",
    specs: {
      processor: "Intel Core i7-1255U",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      display: "13.5-inch 3K2K OLED",
      warranty: "1 Year"
    }
  }
];

/**
 * Helper function to fetch data with retries
 */
async function fetchWithRetry(url: string, options = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      return response;
    }
    
    // If we got a 429 or 5xx error and have retries left
    if ((response.status === 429 || response.status >= 500) && retries > 0) {
      console.log(`Retrying fetch to ${url}, attempts left: ${retries}`);
      
      // Wait for backoff duration
      await new Promise(resolve => setTimeout(resolve, backoff));
      
      // Exponential backoff
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Network error, retrying fetch to ${url}, attempts left: ${retries}`);
      
      // Wait for backoff duration
      await new Promise(resolve => setTimeout(resolve, backoff));
      
      // Exponential backoff
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    console.log('Proxy API route called');
    
    // Try to get data from the actual ERP API
    try {
      const apiUrl = "https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList";
      console.log(`Proxying request to: ${apiUrl}`);
      
      const response = await fetchWithRetry(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data && data.data && Array.isArray(data.data)) {
          console.log(`Successfully fetched ${data.data.length} products from external API`);
          return NextResponse.json(data);
        } else {
          console.warn('API response was ok but data format is invalid, using fallback data');
        }
      } else {
        console.warn(`API request failed with status: ${response.status}, using fallback data`);
      }
    } catch (error) {
      console.error('Error fetching from external API, using fallback data:', error);
    }
    
    // If we get here, the external API call either failed or returned invalid data
    // Return fallback data to ensure the frontend can still function
    console.log('Returning fallback data');
    return NextResponse.json({
      status: 200,
      data: FALLBACK_DATA
    });
    
  } catch (error) {
    console.error('Error in proxy API route:', error);
    return NextResponse.json(
      { error: 'Internal server error in proxy API' }, 
      { status: 500 }
    );
  }
} 