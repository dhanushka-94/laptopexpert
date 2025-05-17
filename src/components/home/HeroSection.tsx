"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Images from the specified folder
  const sliderImages = [
    '/images/slider/slider1 (1).jpg',
    '/images/slider/slider1 (2).jpg',
    '/images/slider/slider1 (3).jpg',
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <section className="relative bg-card overflow-hidden w-full">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30 z-10" />
        
        {/* Slider images */}
        {sliderImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image 
              src={image} 
              alt={`Slider image ${index + 1}`} 
              fill 
              priority
              className="object-cover object-center"
              onLoad={handleImageLoad}
            />
          </motion.div>
        ))}
        
        {/* Slider indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentSlide === index 
                  ? 'bg-primary' 
                  : 'bg-gray-300/50 hover:bg-gray-300/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container relative z-20 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              variants={itemVariants}
            >
              <motion.span 
                className="text-primary"
                animate={{ 
                  color: ["#3b82f6", "#6366f1", "#4f46e5", "#3b82f6"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Premium Laptops
              </motion.span> for Every Need
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-md"
              variants={itemVariants}
            >
              Sri Lanka&apos;s trusted destination for brand new and used laptops, professional repair services, and quality accessories.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="px-8" asChild>
                  <Link href="/laptops">Shop Laptops</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8" asChild>
                  <Link href="/services">Our Services</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              variants={featureVariants}
            >
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={featureItemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Quality Assured</h3>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={featureItemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Quick Delivery</h3>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={featureItemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Warranty</h3>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={featureItemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Expert Service</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 