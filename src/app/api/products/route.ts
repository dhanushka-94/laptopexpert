import { NextResponse } from 'next/server';

// Define interface for API response items
interface ApiItem {
  id: string | number;
  item_name: string;
  item_code: string;
  sale_price: string;
  whole_sale_price: string;
  category_name: string;
  brand_name: string;
  warranty: string;
  warranty_date: string;
  image_url?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  promotion_price?: string;
  stock?: number;
  [key: string]: any;
}

// Define interface for transformed products
interface TransformedProduct {
  id: string | number;
  name: string;
  item_code: string;
  price: number;
  original_price: number;
  discount_price: number | null;
  discount_percentage: number;
  category: string;
  brand: string;
  stock?: number;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    warranty: string;
    [key: string]: string | undefined;
  };
}

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
    console.log('API route called: /api/products');
    
    // Get the actual data from the real API
    const apiUrl = "https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList";
    console.log(`Fetching from external API: ${apiUrl}`);
    
    const response = await fetchWithRetry(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`API request failed with status: ${response.status} - ${response.statusText}`);
      return NextResponse.json(
        { 
          error: `API request failed with status: ${response.status}`,
          details: response.statusText
        }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log(`API response received. Data object has keys: ${Object.keys(data).join(', ')}`);
    
    // Get the query parameters from the request
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    
    // Make sure we have valid data
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Invalid data format from external API:', data);
      return NextResponse.json(
        { 
          error: 'Invalid data format from external API',
          received: JSON.stringify(data).substring(0, 200) + '...' // Show partial data for debugging
        }, 
        { status: 500 }
      );
    }
    
    console.log(`Successfully parsed ${data.data.length} products from external API`);
    
    // Transform the API data to match our app's expected format
    let transformedProducts = data.data.map((item: ApiItem) => {
      // Calculate the correct prices
      const salePrice = parseFloat(item.sale_price);
      const hasPromotion = !!item.promotion_price && item.promotion_price !== undefined && parseFloat(item.promotion_price) > 0;
      const promotionPrice = hasPromotion && item.promotion_price ? parseFloat(item.promotion_price) : null;
      const regularPrice = parseFloat(item.whole_sale_price || item.sale_price);
      
      // Calculate discount percentage only if there's a promotion from API
      const discountPercentage = hasPromotion ? 
        Math.round(((regularPrice - promotionPrice!) / regularPrice) * 100) : 0;
      
      return {
      id: item.id,
      name: item.item_name,
      item_code: item.item_code,
      slug: item.item_code,
        price: hasPromotion ? promotionPrice! : salePrice,
        original_price: regularPrice,
        discount_price: hasPromotion ? promotionPrice! : null,
        discount_percentage: discountPercentage,
      category: item.category_name,
      brand: item.brand_name,
      image_url: item.image_url || '/images/placeholder.jpg',
        stock: item.stock !== undefined ? parseInt(item.stock.toString()) : undefined,
      specs: {
        processor: item.processor || 'Not specified',
        ram: item.ram || 'Not specified',
        storage: item.storage || 'Not specified',
        display: item.display || 'Not specified',
        warranty: item.warranty !== "0" ? `${item.warranty} ${item.warranty_date}` : 'No warranty'
      }
      };
    });
    
    console.log(`Transformed ${transformedProducts.length} products`);
    
    // Filter out service products
    transformedProducts = transformedProducts.filter((product: TransformedProduct) => 
      !(product.category && product.category.toLowerCase().includes('service'))
    );
    
    // Sort products: in stock first, then out of stock
    transformedProducts.sort((a: TransformedProduct, b: TransformedProduct) => {
      // If stock is undefined for either, treat as in stock
      const aInStock = a.stock === undefined || a.stock > 0;
      const bInStock = b.stock === undefined || b.stock > 0;
      
      if (aInStock && !bInStock) return -1; // a is in stock, b is not
      if (!aInStock && bInStock) return 1;  // b is in stock, a is not
      return 0; // both have same stock status
    });
    
    // Apply filters if needed
    if (featured === 'true') {
      // For demo purposes, mark some products as featured
      transformedProducts = transformedProducts.slice(0, 4);
    }
    
    if (category) {
      console.log(`Filtering products by category: "${category}"`);
      
      // First try exact matches
      let categoryProducts = transformedProducts.filter((product: TransformedProduct) => 
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );
      
      // If no results, try includes matches (more flexible)
      if (categoryProducts.length === 0) {
        console.log(`No exact category matches, trying includes matching for: "${category}"`);
        categoryProducts = transformedProducts.filter((product: TransformedProduct) => 
          product.category && 
          (product.category.toLowerCase().includes(category.toLowerCase()) || 
           category.toLowerCase().includes(product.category.toLowerCase()))
        );
      }
      
      console.log(`Found ${categoryProducts.length} products for category: "${category}"`);
      transformedProducts = categoryProducts;
    }
    
    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        transformedProducts = transformedProducts.slice(0, limit);
      }
    }
    
    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' }, 
      { status: 500 }
    );
  }
}

// This function is not needed for API routes in App Router
// export async function generateStaticParams() {
//   return sampleProducts.map((product) => ({
//     id: product.id,
//   }));
// } 