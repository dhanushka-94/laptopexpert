"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sample cart data
const CART_ITEMS = [
  {
    id: '1',
    title: 'Dell XPS 13 9310 - Intel Core i7 11th Gen',
    imageUrl: '/images/laptops/dell-xps-13.jpg',
    price: 275000,
    originalPrice: 320000,
    quantity: 1,
  },
  {
    id: '7',
    title: 'Microsoft Surface Laptop 4 - Certified Refurbished',
    imageUrl: '/images/laptops/surface-laptop.jpg',
    price: 280000,
    originalPrice: 350000,
    quantity: 1,
  },
];

export default function CartPage() {
  const subtotal = CART_ITEMS.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = CART_ITEMS.reduce((total, item) => {
    if (item.originalPrice) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-6 md:py-12">
        <ScrollAnimation>
          <div className="flex items-center mb-8 gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Shopping Cart</h1>
          </div>
          
          {CART_ITEMS.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {CART_ITEMS.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="sm:w-32 h-24 sm:h-32 relative rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 640px) 8rem, 6rem"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <h3 className="font-medium">
                            <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                              {item.title}
                            </Link>
                          </h3>
                          <div className="font-semibold">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                          <div className="flex items-center border rounded-md">
                            <motion.button 
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <motion.button 
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>
                          
                          <motion.button 
                            className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 flex items-center gap-4">
                  <Link href="/laptops" className="text-sm text-primary hover:underline">
                    &larr; Continue Shopping
                  </Link>
                </div>
              </div>
              
              <div>
                <motion.div 
                  className="border rounded-lg p-6 sticky top-24"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-green-500">- Rs. {discount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Coupon code" className="flex-1" />
                      <Button variant="outline" size="sm">Apply</Button>
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Checkout
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </motion.div>
                    
                    <div className="pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Tag className="h-4 w-4" />
                        <span>Secure Checkout</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        We accept all major credit cards, debit cards, and mobile payment methods.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div 
              className="text-center py-16 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Looks like you haven&apos;t added any laptops to your cart yet. Browse our collection to find the perfect laptop for your needs.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button asChild>
                  <Link href="/laptops">Browse Laptops</Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </ScrollAnimation>
      </div>
    </MainLayout>
  );
} 