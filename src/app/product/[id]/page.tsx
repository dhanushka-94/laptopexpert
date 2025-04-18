"use client";

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

// Sample products data - in a real app, this would come from a database or API
const PRODUCTS = [
  {
    id: '1',
    title: 'Dell XPS 13 9310 - Intel Core i7 11th Gen',
    imageUrl: '/images/laptops/dell-xps-13.jpg',
    images: [
      '/images/laptops/dell-xps-13.jpg',
      '/images/laptops/dell-xps-13-2.jpg',
      '/images/laptops/dell-xps-13-3.jpg',
    ],
    price: 275000,
    originalPrice: 320000,
    condition: 'new' as const,
    specs: {
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
    },
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
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0];
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </AspectRatio>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {product.images?.map((image, index) => (
                  <motion.div 
                    key={index} 
                    className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AspectRatio ratio={4/3}>
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 16vw, 30vw"
                      />
                    </AspectRatio>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Product Info */}
          <ScrollAnimation direction="left">
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.title}</h1>
              
              <div className="flex items-center gap-2 mt-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : i < product.rating 
                            ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                            : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 mb-6">
                <span className="text-2xl sm:text-3xl font-bold">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium bg-red-500 text-white px-2 py-1 rounded-md">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className={`mb-6 px-4 py-2 rounded-md ${product.stock > 0 ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}`}>
                <span className="font-medium">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
              </div>

              <div className="grid gap-4 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full gap-2">
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
                  <span className="text-sm font-medium">{product.specs.warranty}</span>
                  <span className="text-xs text-muted-foreground">Official warranty</span>
                </div>
                <div className="flex flex-col items-center bg-card/50 backdrop-blur-sm rounded-lg p-4">
                  <Tag className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                  <span className="text-xs text-muted-foreground">Multiple payment options</span>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Key Specifications:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Processor:</span> {product.specs.processor}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">RAM:</span> {product.specs.ram}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Storage:</span> {product.specs.storage}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Display:</span> {product.specs.display}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Graphics:</span> {product.specs.graphics}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">OS:</span> {product.specs.os}
                  </li>
                </ul>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={0.3}>
          <div className="mt-12">
            <Tabs defaultValue="description">
              <div className="overflow-x-auto">
                <TabsList className="bg-card w-full justify-start">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Full Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">{product.description}</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">System</h3>
                    <dl className="space-y-4">
                      {Object.entries(product.specs).map(([key, value], index) => (
                        <motion.div 
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <dt className="font-medium capitalize">{key}</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </motion.div>
                      ))}
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Physical</h3>
                    <dl className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <dt className="font-medium">Condition</dt>
                        <dd className="text-muted-foreground capitalize">{product.condition}</dd>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        viewport={{ once: true }}
                      >
                        <dt className="font-medium">Weight</dt>
                        <dd className="text-muted-foreground">{product.specs.weight}</dd>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <dt className="font-medium">Ports</dt>
                        <dd className="text-muted-foreground">{product.specs.ports}</dd>
                      </motion.div>
                    </dl>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : i < product.rating 
                                ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                                : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Based on {product.reviews} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <div className="text-sm w-2">{star}</div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full" 
                              style={{ 
                                width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` 
                              }} 
                            />
                          </div>
                          <div className="text-sm text-muted-foreground w-8">
                            {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:ml-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button>Write a Review</Button>
                    </motion.div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[1, 2].map((index) => (
                    <motion.div 
                      key={index}
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-semibold">{index === 1 ? 'H' : 'D'}</span>
                        </div>
                        <div>
                          <div className="font-medium">{index === 1 ? 'Hiruni Perera' : 'Dinesh Kumar'}</div>
                          <div className="text-sm text-muted-foreground">{index === 1 ? '2 months ago' : '1 month ago'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < (index === 1 ? 5 : 4) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm">
                        {index === 1 
                          ? "I've been using this laptop for two months now, and it's been excellent for my development work. The build quality is superb, and the performance is more than enough for my needs. Battery life is impressive, easily lasting a full workday. Highly recommended!"
                          : "Great laptop overall. The screen is amazing and performance is solid. My only complaint is that it runs a bit hot during intensive tasks. The keyboard is comfortable to type on, and the trackpad is responsive. Delivery was prompt, and the laptop was well-packaged."
                        }
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline">Load More Reviews</Button>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollAnimation>
      </div>
    </MainLayout>
  );
} 