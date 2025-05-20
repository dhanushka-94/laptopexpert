"use client";

import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
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
}

export function ProductCard({
  id,
  title,
  imageUrl,
  price,
  originalPrice,
  condition,
  specs,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const brandName = title.split(' ')[0]; // Extract the first word as brand name
  const fullImageUrl = imageUrl ? `https://erp.laptopexpert.lk//uploads/items/${imageUrl}` : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden group h-full">
        <Link href={`/product/${id}`}>
          <div className="relative">
            <AspectRatio ratio={4/3}>
              {!imageError && imageUrl ? (
                <Image
                  src={fullImageUrl}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
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
          </div>
        </Link>
        
                <CardContent className="p-4">          <Link href={`/product/${id}`} className="block">            <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">              {title}            </h3>          </Link>                    <div className="text-xs text-muted-foreground space-y-1 mb-2">            <p>{specs.processor}</p>            <p>{specs.ram} RAM • {specs.storage}</p>            <p>{specs.display}</p>          </div>                    <div className="flex items-baseline gap-2 mt-2">            <motion.span               className="text-lg font-semibold"              initial={{ opacity: 0 }}              animate={{ opacity: 1 }}              transition={{ delay: 0.3 }}            >              Rs. {price.toLocaleString()}            </motion.span>            {originalPrice && (              <motion.span                 className="text-sm text-muted-foreground line-through"                initial={{ opacity: 0 }}                animate={{ opacity: 1 }}                transition={{ delay: 0.4 }}              >                Rs. {originalPrice.toLocaleString()}              </motion.span>            )}          </div>        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full"
          >
            <Button className="w-full gap-2" size="sm">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 