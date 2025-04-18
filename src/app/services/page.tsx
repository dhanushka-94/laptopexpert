"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Wrench, Zap, CheckCircle, HardDrive, Shield, RefreshCw, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';

// Sample data for repair services
const REPAIR_SERVICES = [
  {
    title: 'Screen Replacement',
    icon: Monitor,
    description: 'Fix cracked, damaged, or non-functioning laptop displays with genuine replacement parts',
    price: 'From Rs. 15,000',
    duration: '1-2 days',
  },
  {
    title: 'Battery Replacement',
    icon: Battery,
    description: 'Restore your laptop&apos;s battery life with high-quality replacement batteries',
    price: 'From Rs. 8,000',
    duration: 'Same day',
  },
  {
    title: 'Keyboard Replacement',
    icon: Keyboard,
    description: 'Replace damaged, sticky, or non-responsive keys or full keyboard units',
    price: 'From Rs. 6,500',
    duration: '1 day',
  },
  {
    title: 'Virus Removal & Security',
    icon: Shield,
    description: 'Remove malware, viruses, and secure your system with professional software',
    price: 'From Rs. 3,500',
    duration: '1 day',
  },
  {
    title: 'Data Recovery',
    icon: HardDrive,
    description: 'Recover important files and data from damaged or corrupted hard drives',
    price: 'From Rs. 10,000',
    duration: '2-5 days',
  },
  {
    title: 'Hardware Upgrades',
    icon: Zap,
    description: 'Upgrade RAM, storage, and other components to improve performance',
    price: 'From Rs. 5,000',
    duration: 'Same day',
  },
  {
    title: 'OS Installation',
    icon: RefreshCw,
    description: 'Clean installation of Windows or macOS with all necessary drivers',
    price: 'From Rs. 4,000',
    duration: '1 day',
  },
  {
    title: 'Liquid Damage Repair',
    icon: Wrench,
    description: 'Specialized service to recover laptops damaged by spills or water exposure',
    price: 'From Rs. 12,000',
    duration: '3-5 days',
  },
];

// Fix the missing import
import { Monitor, Battery, Keyboard } from 'lucide-react';

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-4 gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Laptop Repair Services</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/2">
            <p className="text-xl mb-4">
              Professional laptop repair services for all brands and models in Sri Lanka.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of experienced technicians can diagnose and fix a wide range of laptop issues, from screen replacements to motherboard repairs. We use only genuine parts and offer a warranty on all our services.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Certified Technicians</h3>
                  <p className="text-sm text-muted-foreground">Our repair team is certified by major laptop manufacturers</p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Warranty On All Repairs</h3>
                  <p className="text-sm text-muted-foreground">3-month warranty on parts and labor for all repairs</p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Quick Turnaround Time</h3>
                  <p className="text-sm text-muted-foreground">Most repairs completed within 24-48 hours</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Book a Repair
              </Button>
              <Button variant="outline" size="lg">
                Service Pricing
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <AspectRatio ratio={16/9} className="bg-card rounded-lg overflow-hidden">
              <div className="product-image-fallback w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <Wrench className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-medium mb-2">Laptop Repair Services</h3>
                <p className="text-muted-foreground">Image showing technician repairing a laptop</p>
              </div>
            </AspectRatio>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Our Repair Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPAIR_SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                    <div className="text-sm font-medium">{service.price}</div>
                    <div className="text-xs text-muted-foreground">{service.duration}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help With Your Laptop?</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Whether it&apos;s a hardware issue, software problem, or you&apos;re looking to upgrade your laptop, our team is here to help. We offer free diagnostics and transparent pricing.
          </p>
          <Button size="lg">Contact Our Repair Team</Button>
        </div>
      </div>
    </MainLayout>
  );
} 