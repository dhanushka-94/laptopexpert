"use client";

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Share2, ChevronLeft, Star, Truck, Shield, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { motion } from 'framer-motion';
import { fetchProductBySlug } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';

// Define product interface
interface ProductSpec {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics?: string;
  battery?: string;
  weight?: string;
  ports?: string;
  os?: string;
  operating_system?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

interface Product {
  id: string | number;
  title?: string;
  name?: string;
  slug: string;
  description?: string;
  image?: string;
  image_url?: string;
  price: number;
  original_price?: number;
  discount_price?: number;
  stock?: number;
  condition?: string;
  rating?: number;
  reviews?: number;
  specs: string | ProductSpec;
  features?: string[];
  images?: string[];
  relatedProducts?: any[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const fetchedProduct = await fetchProductBySlug(productId);
        
        if (fetchedProduct && fetchedProduct.id) {
          setProduct(fetchedProduct as Product);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // Parse specs if they are a string
  const getSpecs = (): ProductSpec => {
    if (!product) return {} as ProductSpec;
    
    if (typeof product.specs === 'string') {
      try {
        return JSON.parse(product.specs) as ProductSpec;
      } catch (e) {
        return {} as ProductSpec;
      }
    }
    
    return product.specs as ProductSpec;
  };

  const specs = getSpecs();
  
  // Calculate discount percentage
  const discount = product?.original_price || product?.discount_price
    ? Math.round((((product.original_price ?? product.discount_price ?? 0) - product.price) / (product.original_price ?? product.discount_price ?? 1)) * 100)
    : 0;

  // Loading skeleton
  if (loading) {
    return (
      <MainLayout>
        <div className="container px-4 md:px-6 py-6 md:py-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-24 bg-card animate-pulse rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg bg-card animate-pulse h-[400px]"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-card animate-pulse rounded"></div>
              <div className="h-6 w-1/2 bg-card animate-pulse rounded"></div>
              <div className="h-12 w-1/3 bg-card animate-pulse rounded"></div>
              <div className="h-10 w-full bg-card animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <MainLayout>
        <div className="container px-4 md:px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the product you're looking for.
            </p>
            <Button onClick={() => router.push('/laptops')}>
              Browse All Products
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-6 md:py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/laptops" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Laptops</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <ScrollAnimation direction="right">
            <div>
              <div className="rounded-lg overflow-hidden border mb-4">
                <AspectRatio ratio={4/3}>
                  <Image
                    src={product.image || product.image_url || '/images/placeholder.jpg'}
                    alt={product.title || product.name || 'Product Image'}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </AspectRatio>
              </div>
              
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <motion.div 
                      key={index} 
                      className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AspectRatio ratio={4/3}>
                        <Image
                          src={image}
                          alt={`${product.title || product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 16vw, 30vw"
                        />
                      </AspectRatio>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Product Info */}
          <ScrollAnimation direction="left">
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.name || product.title || 'Product'}</h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 0) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : i < (product.rating || 0)
                              ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                              : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-baseline gap-2 mb-6">
                <span className="text-2xl sm:text-3xl font-bold">Rs. {product.price.toLocaleString()}</span>
                {(product.original_price || product.discount_price) && discount > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      Rs. {((product.original_price ?? product.discount_price) ?? 0).toLocaleString()}
                    </span>
                    <span className="text-sm font-medium bg-red-500 text-white px-2 py-1 rounded-md">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.stock !== undefined && (
                <div className={`mb-6 px-4 py-2 rounded-md ${product.stock > 0 ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}`}>
                  <span className="font-medium">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
                </div>
              )}

              <div className="grid gap-4 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full gap-2" disabled={!product.stock || product.stock <= 0}>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                </motion.div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <Heart className="h-5 w-5" />
                      <span className="hidden sm:inline">Wishlist</span>
                      <span className="sm:hidden">Save</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <Share2 className="h-5 w-5" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center bg-card/50 backdrop-blur-sm rounded-lg p-4">
                  <Truck className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">Free Delivery</span>
                  <span className="text-xs text-muted-foreground">Island-wide</span>
                </div>
                <div className="flex flex-col items-center bg-card/50 backdrop-blur-sm rounded-lg p-4">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{specs.warranty || '1 Year Warranty'}</span>
                  <span className="text-xs text-muted-foreground">Official warranty</span>
                </div>
                <div className="flex flex-col items-center bg-card/50 backdrop-blur-sm rounded-lg p-4">
                  <Tag className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                  <span className="text-xs text-muted-foreground">Multiple payment options</span>
                </div>
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              )}

              {/* Product Specs */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {specs.processor && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processor</span>
                      <span className="font-medium">{specs.processor}</span>
                    </div>
                  )}
                  {specs.ram && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RAM</span>
                      <span className="font-medium">{specs.ram}</span>
                    </div>
                  )}
                  {specs.storage && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">{specs.storage}</span>
                    </div>
                  )}
                  {specs.display && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Display</span>
                      <span className="font-medium">{specs.display}</span>
                    </div>
                  )}
                  {specs.graphics && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Graphics</span>
                      <span className="font-medium">{specs.graphics}</span>
                    </div>
                  )}
                  {specs.battery && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery</span>
                      <span className="font-medium">{specs.battery}</span>
                    </div>
                  )}
                  {specs.weight && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">{specs.weight}</span>
                    </div>
                  )}
                  {(specs.os || specs.operating_system) && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OS</span>
                      <span className="font-medium">{specs.os || specs.operating_system}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Key Features</h2>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>

        {/* Related Products Section */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`}>
                  <div className="border rounded-lg overflow-hidden hover:border-primary transition-all group">
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image || '/images/placeholder.jpg'}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base line-clamp-2 group-hover:text-primary">
                        {relatedProduct.title}
                      </h3>
                      <p className="mt-2 font-semibold">
                        Rs. {relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 