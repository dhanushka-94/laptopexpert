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
  [key: string]: any;
}

// Define interface for transformed products
interface TransformedProduct {
  id: string | number;
  name: string;
  item_code: string;
  price: number;
  original_price: number;
  category: string;
  brand: string;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    warranty: string;
    [key: string]: string | undefined;
  };
}

export async function GET(request: Request) {
  try {
    // Get the actual data from the real API
    const response = await fetch("https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status: ${response.status}` }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Get the query parameters from the request
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    
    // Make sure we have valid data
    if (!data || !data.data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: 'Invalid data format from external API' }, 
        { status: 500 }
      );
    }
    
    // Transform the API data to match our app's expected format
    let transformedProducts = data.data.map((item: ApiItem) => ({
      id: item.id,
      name: item.item_name,
      item_code: item.item_code,
      price: parseFloat(item.sale_price),
      category: item.category_name,
      brand: item.brand_name,
      specs: {
        processor: item.processor || 'Not specified',
        ram: item.ram || 'Not specified',
        storage: item.storage || 'Not specified',
        display: item.display || 'Not specified',
        warranty: item.warranty !== "0" ? `${item.warranty} ${item.warranty_date}` : 'No warranty'
      }
    }));
    
    // Apply filters if needed
    if (featured === 'true') {
      // For demo purposes, mark some products as featured
      transformedProducts = transformedProducts.slice(0, 4);
    }
    
    if (category) {
      transformedProducts = transformedProducts.filter((product: TransformedProduct) => 
        product.category && product.category.toLowerCase().includes(category.toLowerCase())
      );
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