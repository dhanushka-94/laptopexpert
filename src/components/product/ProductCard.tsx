"use client";

import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  condition: 'new' | 'used';
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
  discountPercentage?: number;
  stock?: number;
  category?: string;
  slug?: string;
}

export function ProductCard({
  id,
  title,
  imageUrl,
  price,
  originalPrice,
  condition,
  specs,
  discountPercentage,
  stock,
  category,
  slug,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  // Only use the discount percentage from the API
  const discount = discountPercentage || 0;
  
  const brandName = title.split(' ')[0]; // Extract the first word as brand name
  
  // Use slug if available, otherwise fall back to id
  const productLink = `/product/${slug || id}`;
  
  // Skip rendering if this is a service category product
  if (category && category.toLowerCase().includes('service')) {
    return null;
  }
  
  // Fix the image URL if needed
  const isFullUrl = imageUrl.startsWith('http') || imageUrl.startsWith('/'); 
  const fullImageUrl = isFullUrl ? imageUrl : `https://erp.laptopexpert.lk/uploads/items/${imageUrl}`;
  
  // Format the price with .00
  const formatPrice = (value: number) => {
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };
  
  // Check if product is in stock
  const isInStock = stock === undefined ? true : stock > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden group h-full flex flex-col border border-border/50">
        <Link href={productLink} className="flex-shrink-0">
          <div className="relative w-full bg-background">
            <AspectRatio ratio={1/1} className="m-0 p-0 bg-background">
              {!imageError && imageUrl ? (
                <Image
                  src={fullImageUrl}
                  alt={title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="product-image-fallback w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-2xl font-bold text-muted-foreground">{brandName}</span>
                </div>
              )}
            </AspectRatio>
            
            {condition === 'used' && (
              <motion.div 
                className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Used
              </motion.div>
            )}
            
            {discount > 0 && (
              <motion.div 
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {discount}% OFF
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ display: discount > 0 ? 'none' : 'flex' }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background/90 text-muted-foreground hover:text-foreground"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </motion.div>
            
            {/* Stock indicator badge */}
            {stock !== undefined && (
              <div className={`absolute bottom-2 left-2 ${isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1`}>
                {isInStock ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    <span>Out of Stock</span>
                  </>
                )}
              </div>
            )}
          </div>
        </Link>
        
        <CardContent className="p-4 flex-grow">
          <Link href={productLink} className="block">
            <h3 className="font-medium text-base line-clamp-2 mb-1 hover:underline">{title}</h3>
            
            <div className="space-y-1 mt-3">
              <div className="flex items-baseline gap-2">
                <div className="text-lg font-bold text-primary">
                  Rs. {formatPrice(price)}
                </div>
                
                {discount > 0 && originalPrice && (
                  <div className="text-sm line-through text-muted-foreground">
                    Rs. {formatPrice(originalPrice)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2 text-xs text-muted-foreground">
              {specs.processor && <span className="bg-muted px-1.5 py-0.5 rounded">{specs.processor}</span>}
              {specs.ram && <span className="bg-muted px-1.5 py-0.5 rounded">{specs.ram}</span>}
              {specs.storage && <span className="bg-muted px-1.5 py-0.5 rounded">{specs.storage}</span>}
            </div>
          </Link>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full"
          >
            <Button 
              className="w-full gap-2" 
              size="sm"
              disabled={!isInStock}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 