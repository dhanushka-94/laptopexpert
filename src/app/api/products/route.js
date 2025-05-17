import { NextResponse } from 'next/server';

// GET handler to fetch all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '100');
    
    // Get products from the external API
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
    
    // Make sure we have valid data
    if (!data || !data.data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: 'Invalid data format from external API' }, 
        { status: 500 }
      );
    }
    
    // Transform the API data to match our app's expected format
    let products = data.data.map((item) => ({
      id: item.id,
      name: item.item_name,
      title: item.item_name,
      item_code: item.item_code,
      slug: item.item_code,
      image: item.image_url || '/images/placeholder.jpg',
      image_url: item.image_url || '/images/placeholder.jpg',
      price: parseFloat(item.sale_price),
      original_price: parseFloat(item.whole_sale_price || item.sale_price),
      discount_price: parseFloat(item.whole_sale_price || item.sale_price),
      category: item.category_name,
      category_name: item.category_name,
      brand: item.brand_name,
      specs: JSON.stringify({
        processor: item.processor || 'Not specified',
        ram: item.ram || 'Not specified',
        storage: item.storage || 'Not specified',
        display: item.display || 'Not specified',
        warranty: item.warranty !== "0" ? `${item.warranty} ${item.warranty_date}` : 'No warranty'
      }),
      condition: 'new', // Default to new condition unless specified otherwise
      is_featured: false // Default to non-featured
    }));
    
    // Apply filters
    // Filter by featured status (for now, just take the first few)
    if (featured === 'true') {
      products = products.slice(0, 4);
    }
    
    // Filter by category
    if (category) {
      console.log(`Filtering by category: ${category}`);
      const lowercaseCategory = category.toLowerCase();
      
      products = products.filter(product => 
        product.category_name && 
        product.category_name.toLowerCase().includes(lowercaseCategory)
      );
      
      console.log(`Found ${products.length} products in category: ${category}`);
    }
    
    // Apply limit
    if (limit && !isNaN(limit)) {
      products = products.slice(0, limit);
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from API' },
      { status: 500 }
    );
  }
} 