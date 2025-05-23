import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Handle params as it might be a promise in newer Next.js versions
    const slug = params?.slug ? params.slug.toString() : '';
    console.log(`Looking for product with slug: ${slug}`);
    
    // Get product list from the external API
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
    
    // Find product by ID, item_code, or slug
    const product = data.data.find((item: any) => 
      item.id.toString() === slug || 
      item.item_code === slug ||
      item.slug === slug
    );
    
    if (product) {
      console.log(`Found product: ${product.item_name} (ID: ${product.id}, Item Code: ${product.item_code})`);
      
      // Calculate prices based on API data only
      const salePrice = parseFloat(product.sale_price);
      const hasPromotion = !!product.promotion_price && product.promotion_price !== undefined && parseFloat(product.promotion_price) > 0;
      const promotionPrice = hasPromotion && product.promotion_price ? parseFloat(product.promotion_price) : null;
      const regularPrice = parseFloat(product.whole_sale_price || product.sale_price);
      
      // Calculate discount percentage only if there's a promotion from API
      const discountPercentage = hasPromotion ? 
        Math.round(((regularPrice - promotionPrice!) / regularPrice) * 100) : 0;
      
      // Transform the product to match our app's expected format
      const transformedProduct = {
        id: product.id,
        name: product.item_name,
        item_code: product.item_code,
        slug: product.item_code, // Use item_code as slug if no dedicated slug field exists
        price: hasPromotion ? promotionPrice! : salePrice,
        original_price: regularPrice,
        discount_price: hasPromotion ? promotionPrice! : null,
        discount_percentage: discountPercentage,
        category: product.category_name,
        brand: product.brand_name,
        stock: product.stock !== undefined ? parseInt(product.stock.toString()) : undefined,
        image: product.image_url || '/images/placeholder.jpg',
        image_url: product.image_url || '/images/placeholder.jpg',
        specs: {
          processor: product.processor || 'Not specified',
          ram: product.ram || 'Not specified',
          storage: product.storage || 'Not specified',
          display: product.display || 'Not specified',
          warranty: product.warranty !== "0" ? `${product.warranty} ${product.warranty_date}` : 'No warranty'
        }
      };
      
      return NextResponse.json(transformedProduct);
    } else {
      console.log(`Product not found for slug: ${slug}`);
    }
    
    // Return 404 if product not found
    return new NextResponse(null, { status: 404 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' }, 
      { status: 500 }
    );
  }
} 