import { NextResponse } from 'next/server';

// GET handler to fetch all products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '100');
    
    // Get products from the new API endpoint
    const response = await fetch("https://api.erp.laptopexpert.lk/api/products", {
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
    
    const apiResponse = await response.json();
    
    // Make sure we have valid data
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data) || apiResponse.status !== 'success') {
      return NextResponse.json(
        { error: 'Invalid data format from external API' }, 
        { status: 500 }
      );
    }
    
    // Transform the API data to match our app's expected format
    let products = apiResponse.data.map((item) => ({
      id: item.id,
      name: item.name || item.alternative_name,
      title: item.name || item.alternative_name,
      item_code: item.code,
      slug: item.code,
      image: item.photo ? `https://api.erp.laptopexpert.lk/uploads/${item.photo}` : '/images/placeholder.jpg',
      image_url: item.photo ? `https://api.erp.laptopexpert.lk/uploads/${item.photo}` : '/images/placeholder.jpg',
      price: parseFloat(item.sale_price),
      original_price: item.promotion_price ? parseFloat(item.promotion_price) : parseFloat(item.sale_price),
      discount_price: item.promotion_price ? parseFloat(item.promotion_price) : parseFloat(item.sale_price),
      category: item.category_name,
      category_name: item.category_name,
      brand: item.brand_name,
      stock: item.stock,
      description: item.description,
      specs: JSON.stringify({
        processor: item.processor || 'Not specified',
        ram: item.ram || 'Not specified',
        storage: item.storage || 'Not specified',
        display: item.display || 'Not specified',
        warranty: item.warranty_period ? `${item.warranty_period} ${item.warranty_category}` : 'No warranty'
      }),
      // Determine condition based on category name
      condition: item.category_name && item.category_name.toLowerCase().includes('used') ? 'used' : 'new',
      // Set featured based on stock and promotion
      is_featured: item.promotion_price !== null || item.stock > 0
    }));
    
    console.log(`Loaded ${products.length} products from API`);
    
    // Apply filters
    // Filter by featured status
    if (featured === 'true') {
      products = products.filter(product => product.is_featured && product.stock > 0);
      // If no featured products, just take the first few in-stock items
      if (products.length === 0) {
        products = apiResponse.data
          .filter(item => item.stock > 0)
          .slice(0, 4)
          .map(item => ({
            id: item.id,
            name: item.name || item.alternative_name,
            title: item.name || item.alternative_name,
            item_code: item.code,
            slug: item.code,
            image: item.photo ? `https://api.erp.laptopexpert.lk/uploads/${item.photo}` : '/images/placeholder.jpg',
            image_url: item.photo ? `https://api.erp.laptopexpert.lk/uploads/${item.photo}` : '/images/placeholder.jpg',
            price: parseFloat(item.sale_price),
            original_price: item.promotion_price ? parseFloat(item.promotion_price) : parseFloat(item.sale_price),
            discount_price: item.promotion_price ? parseFloat(item.promotion_price) : parseFloat(item.sale_price),
            category: item.category_name,
            category_name: item.category_name,
            brand: item.brand_name,
            stock: item.stock,
            description: item.description,
            specs: JSON.stringify({
              processor: item.processor || 'Not specified',
              ram: item.ram || 'Not specified',
              storage: item.storage || 'Not specified',
              display: item.display || 'Not specified',
              warranty: item.warranty_period ? `${item.warranty_period} ${item.warranty_category}` : 'No warranty'
            }),
            condition: item.category_name && item.category_name.toLowerCase().includes('used') ? 'used' : 'new',
            is_featured: true
          }));
      }
      
      // Limit to 4 featured products
      products = products.slice(0, 4);
    }
    
    // Filter by category
    if (category) {
      console.log(`Filtering by category: "${category}"`);
      const lowercaseCategory = category.toLowerCase();
      
      products = products.filter(product => 
        product.category_name && 
        product.category_name.toLowerCase().includes(lowercaseCategory)
      );
      
      console.log(`Found ${products.length} products in category: "${category}"`);
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