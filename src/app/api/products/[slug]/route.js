import { NextResponse } from 'next/server';

// Sample products data - same as in route.js
const PRODUCTS = [
  {
    id: '1',
    name: 'Dell XPS 13',
    title: 'Dell XPS 13 9310 - Intel Core i7 11th Gen',
    slug: 'dell-xps-13',
    image: '/images/laptops/dell-xps-13.jpg',
    image_url: '/images/laptops/dell-xps-13.jpg',
    images: [
      '/images/laptops/dell-xps-13.jpg',
      '/images/laptops/dell-xps-13.jpg',
      '/images/laptops/dell-xps-13.jpg',
    ],
    price: 275000,
    original_price: 320000,
    discount_price: 275000,
    condition: 'new',
    specs: JSON.stringify({
      processor: 'Intel Core i7-1165G7',
      ram: '16GB LPDDR4x',
      storage: '512GB SSD',
      display: '13.4" FHD+ (1920 x 1200) InfinityEdge',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Up to 14 hours',
      weight: '1.2 kg',
      ports: '2x Thunderbolt 4, headphone jack, microSD',
      os: 'Windows 11 Home',
      warranty: '1 Year Dell Official Warranty',
    }),
    description: 'The Dell XPS 13 is a premium ultrabook with a stunning design and powerful performance. This laptop features a beautiful edge-to-edge display, long battery life, and excellent build quality. Perfect for professionals, students, and anyone who needs a reliable and portable laptop.',
    stock: 5,
    rating: 4.8,
    reviews: 24,
    features: [
      'InfinityEdge display with minimal bezels',
      'Machined aluminum chassis with carbon fiber palm rest',
      'Backlit keyboard with comfortable typing experience',
      'HD webcam with Windows Hello support',
      'Wi-Fi 6 and Bluetooth 5.1 connectivity',
      'Stereo speakers with Waves MaxxAudio Pro',
    ],
    is_featured: true,
    category_id: 1,
    category_name: 'Ultrabook',
  },
  {
    id: '2',
    name: 'MacBook Pro 14',
    title: 'MacBook Pro 14" M1 Pro - Slightly Used',
    slug: 'macbook-pro-14',
    image: '/images/laptops/macbook-pro-14.jpg',
    image_url: '/images/laptops/macbook-pro-14.jpg',
    images: [
      '/images/laptops/macbook-pro-14.jpg',
      '/images/laptops/macbook-pro-14.jpg',
    ],
    price: 420000,
    original_price: 580000,
    discount_price: 420000,
    condition: 'used',
    specs: JSON.stringify({
      processor: 'Apple M1 Pro 8-core',
      ram: '16GB Unified',
      storage: '512GB SSD',
      display: '14.2" Liquid Retina XDR (3024 x 1964)',
      graphics: '14-core GPU',
      battery: 'Up to 17 hours',
      weight: '1.6 kg',
      ports: '3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3',
      os: 'macOS',
      warranty: 'AppleCare+',
    }),
    description: 'The MacBook Pro 14" with M1 Pro chip delivers extraordinary performance and battery life. With its stunning Liquid Retina XDR display and powerful processing capabilities, it\'s perfect for creative professionals and developers.',
    stock: 3,
    rating: 4.9,
    reviews: 42,
    features: [
      'M1 Pro chip for extraordinary performance',
      'Stunning Liquid Retina XDR display',
      'Up to 17 hours of battery life',
      'Studio-quality mic array',
      'Six-speaker sound system with force-cancelling woofers',
    ],
    is_featured: true,
    category_id: 2,
    category_name: 'Premium',
  },
  {
    id: '3',
    name: 'Lenovo ThinkPad X1',
    title: 'Lenovo ThinkPad X1 Carbon Gen 9',
    slug: 'thinkpad-x1',
    image: '/images/laptops/thinkpad-x1.jpg',
    image_url: '/images/laptops/thinkpad-x1.jpg',
    images: [
      '/images/laptops/thinkpad-x1.jpg',
    ],
    price: 310000,
    original_price: null,
    discount_price: null,
    condition: 'new',
    specs: JSON.stringify({
      processor: 'Intel Core i5-1135G7',
      ram: '16GB LPDDR4x',
      storage: '256GB SSD',
      display: '14" FHD (1920 x 1080) IPS Anti-glare',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Up to 16 hours',
      weight: '1.13 kg',
      ports: '2x Thunderbolt 4, 2x USB 3.2, HDMI 2.0, headphone/mic combo',
      os: 'Windows 11 Pro',
      warranty: '3 Year Lenovo Premier Support',
    }),
    description: 'The ThinkPad X1 Carbon is a premium business laptop with robust security features, legendary ThinkPad keyboard, and military-grade durability in an ultralight package.',
    stock: 7,
    rating: 4.7,
    reviews: 35,
    features: [
      'Military-grade durability (MIL-STD-810G certified)',
      'ThinkShutter privacy camera cover',
      'Fingerprint reader integrated with power button',
      'Rapid Charge technology (80% in 1 hour)',
      'TrackPoint pointing device',
    ],
    is_featured: false,
    category_id: 3,
    category_name: 'Business',
  },
  {
    id: '4',
    name: 'ASUS ROG Strix',
    title: 'ASUS ROG Zephyrus G14 - Gaming Laptop',
    slug: 'asus-rog-strix',
    image: '/images/laptops/asus-rog.jpg',
    image_url: '/images/laptops/asus-rog.jpg',
    images: [
      '/images/laptops/asus-rog.jpg',
    ],
    price: 350000,
    original_price: 395000,
    discount_price: 350000,
    condition: 'new',
    specs: JSON.stringify({
      processor: 'AMD Ryzen 9 5900HS',
      ram: '16GB DDR4',
      storage: '1TB NVMe SSD',
      display: '14" QHD 120Hz',
      graphics: 'NVIDIA GeForce RTX 3060 6GB',
      battery: 'Up to 10 hours',
      weight: '1.7 kg',
      ports: '2x USB-C, 2x USB-A, HDMI 2.0b, 3.5mm audio jack',
      os: 'Windows 11 Home',
      warranty: '2 Year ASUS Global Warranty',
    }),
    description: 'The ASUS ROG Zephyrus G14 is a powerful gaming laptop with NVIDIA RTX graphics, AMD Ryzen 9 processor, and a high refresh rate display, all in a compact 14-inch form factor.',
    stock: 4,
    rating: 4.6,
    reviews: 28,
    features: [
      'NVIDIA GeForce RTX 3060 GPU for ultimate gaming performance',
      'AMD Ryzen 9 processor with 8 cores and 16 threads',
      'ROG Intelligent Cooling thermal system',
      'Per-key RGB keyboard with gaming-optimized layout',
      'Dolby Atmos audio for immersive sound',
    ],
    is_featured: true,
    category_id: 4,
    category_name: 'Gaming',
  },
];

// GET handler to fetch product by slug
export async function GET(
  request,
  { params }
) {
  try {
    // Handle params as it might be a promise in newer Next.js versions
    const slug = params?.slug ? params.slug.toString() : '';
    console.log(`Looking for product with slug: ${slug}`);
    
    // Fetch data from external API if configured
    let products = PRODUCTS;
    
    try {
      const response = await fetch("https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data && data.data && Array.isArray(data.data)) {
          // Live data from API - use this instead of sample data
          products = data.data;
          console.log(`Successfully fetched ${products.length} products from API`);
          
          // Find product by ID, item_code, or slug
          const product = products.find((item) => 
            item.id.toString() === slug || 
            item.item_code === slug ||
            item.slug === slug
          );
          
          if (product) {
            console.log(`Found product: ${product.item_name || product.name} (ID: ${product.id})`);
            // Transform the product to match our app's expected format
            const transformedProduct = {
              id: product.id,
              name: product.item_name || product.name,
              title: product.item_name || product.name,
              item_code: product.item_code,
              slug: product.item_code || product.slug || product.id.toString(),
              price: parseFloat(product.sale_price || product.price),
              original_price: parseFloat(product.whole_sale_price || product.original_price || product.sale_price || product.price),
              discount_price: parseFloat(product.discount_price || product.whole_sale_price || product.sale_price || product.price),
              category: product.category_name,
              brand: product.brand_name,
              image: product.image_url || product.image || '/images/placeholder.jpg',
              image_url: product.image_url || product.image || '/images/placeholder.jpg',
              specs: {
                processor: product.processor || 'Not specified',
                ram: product.ram || 'Not specified',
                storage: product.storage || 'Not specified',
                display: product.display || 'Not specified',
                warranty: product.warranty !== "0" ? `${product.warranty} ${product.warranty_date}` : 'No warranty'
              }
            };
            
            // Get related products (simple implementation - just return other products)
            const relatedProducts = products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(p => ({
                id: p.id,
                title: p.item_name || p.name || p.title,
                slug: p.item_code || p.slug || p.id.toString(),
                image: p.image_url || p.image || '/images/placeholder.jpg',
                price: parseFloat(p.sale_price || p.price),
                original_price: parseFloat(p.whole_sale_price || p.original_price || p.price)
              }));
              
            return NextResponse.json({
              ...transformedProduct,
              relatedProducts
            });
          }
          
          // No need to fall back to sample data if we didn't find the product in API data
          console.log(`Product not found in API data for slug: ${slug}`);
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          );
        }
      }
    } catch (apiError) {
      console.error('Error fetching from external API:', apiError);
      // Continue with sample data if API fails
    }
    
    // Fall back to sample data
    console.log('Using sample data as fallback');
    
    // Find product by slug or ID in sample data
    const product = PRODUCTS.find(p => 
      p.slug === slug || 
      p.id.toString() === slug
    );
    
    if (!product) {
      console.log(`Product not found in sample data for slug: ${slug}`);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    console.log(`Found product in sample data: ${product.name} (ID: ${product.id})`);
    
    // Get related products from sample data
    const relatedProducts = PRODUCTS
      .filter(p => p.id !== product.id)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        image: p.image,
        price: p.price,
        original_price: p.original_price
      }));
    
    // Add related products to the product data
    return NextResponse.json({
      ...product,
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 