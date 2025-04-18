"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Headphones, Monitor, Keyboard, Mouse, HardDrive, Battery, Cable } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sample data for accessory categories
const ACCESSORY_CATEGORIES = [
  {
    title: 'Headphones & Audio',
    icon: Headphones,
    description: 'Wireless earbuds, headphones, speakers and more',
    url: '/accessories/audio'
  },
  {
    title: 'Monitors & Displays',
    icon: Monitor,
    description: 'External displays for productivity and gaming',
    url: '/accessories/monitors'
  },
  {
    title: 'Keyboards',
    icon: Keyboard,
    description: 'Mechanical, wireless, and ergonomic keyboards',
    url: '/accessories/keyboards'
  },
  {
    title: 'Mice & Pointing Devices',
    icon: Mouse,
    description: 'Gaming mice, trackpads, and ergonomic options',
    url: '/accessories/mice'
  },
  {
    title: 'Storage Solutions',
    icon: HardDrive,
    description: 'External SSDs, hard drives, and USB drives',
    url: '/accessories/storage'
  },
  {
    title: 'Batteries & Power',
    icon: Battery,
    description: 'Laptop batteries, power banks, and adapters',
    url: '/accessories/power'
  },
  {
    title: 'Cables & Adapters',
    icon: Cable,
    description: 'USB-C, HDMI, dongles, and connectivity solutions',
    url: '/accessories/cables'
  }
];

export default function AccessoriesPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-4 gap-2">
          <Headphones className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Laptop Accessories</h1>
        </div>

        <p className="text-muted-foreground max-w-3xl mb-8">
          Enhance your laptop experience with our range of high-quality accessories. From productivity boosters to gaming peripherals, we have everything you need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCESSORY_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={category.url} className="block h-full">
                <Card className="h-full transition-all hover:border-primary">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{category.description}</p>
                    <Button variant="outline" size="sm" className="self-start">
                      Browse Products
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Looking for Something Specific?</h2>
          <p className="text-muted-foreground mb-6">
            Our team can help you find the perfect accessory for your laptop. Contact us for personalized recommendations.
          </p>
          <Button size="lg">Contact Support</Button>
        </div>
      </div>
    </MainLayout>
  );
} 