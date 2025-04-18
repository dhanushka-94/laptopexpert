"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle, HardDrive, Cpu, MessageSquare, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';

// Sample data for upgrade services
const UPGRADE_SERVICES = [
  {
    title: 'RAM Upgrade',
    icon: Database,
    description: 'Boost your laptop performance with additional RAM for smoother multitasking',
    price: 'From Rs. 6,000',
    benefits: 'Faster app loading, smoother multitasking',
  },
  {
    title: 'SSD Upgrade',
    icon: HardDrive,
    description: 'Replace your traditional HDD with a high-speed SSD for dramatically improved performance',
    price: 'From Rs. 10,000',
    benefits: 'Faster boot times, quicker file access',
  },
  {
    title: 'Dual Drive Setup',
    icon: HardDrive,
    description: 'Keep your original drive and add an SSD for the best of both worlds',
    price: 'From Rs. 12,000',
    benefits: 'Speed + storage capacity',
  },
  {
    title: 'Graphics Card Upgrade',
    icon: Cpu,
    description: 'Upgrade your laptop\'s graphics capabilities (for compatible models)',
    price: 'From Rs. 20,000',
    benefits: 'Better gaming and video editing performance',
  },
];

export default function UpgradeServicesPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-4 gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Hardware Upgrade Services</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/2">
            <p className="text-xl mb-4">
              Boost your laptop's performance with our professional hardware upgrade services.
            </p>
            <p className="text-muted-foreground mb-8">
              Don't replace your laptop - upgrade it! Our hardware upgrade services can breathe new life into your existing laptop, improving speed and performance at a fraction of the cost of buying new.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Compatibility Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">We check and ensure all upgrades are compatible with your laptop model</p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Data Migration Included</h3>
                  <p className="text-sm text-muted-foreground">We'll transfer all your data and settings to your new storage</p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Performance Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">Noticeable performance improvements or your money back</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Schedule an Upgrade
              </Button>
              <Button variant="outline" size="lg">
                View Upgrade Options
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <AspectRatio ratio={16/9} className="bg-card rounded-lg overflow-hidden">
              <div className="product-image-fallback w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-medium mb-2">Hardware Upgrades</h3>
                <p className="text-muted-foreground">Image showing laptop hardware components</p>
              </div>
            </AspectRatio>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Popular Upgrade Options</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UPGRADE_SERVICES.map((service, index) => (
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
                  
                  <div className="flex flex-col mt-auto pt-4 border-t border-border">
                    <div className="text-sm font-medium mb-2">{service.price}</div>
                    <div className="text-xs text-primary-foreground bg-primary/10 rounded-full px-3 py-1 inline-block w-fit">
                      {service.benefits}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6">Upgrade Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="font-bold mb-2">Free Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  We'll evaluate your laptop and recommend the best upgrades for your needs and budget
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="font-bold mb-2">Professional Installation</h3>
                <p className="text-sm text-muted-foreground">
                  Our technicians will carefully install your new hardware components
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="font-bold mb-2">Testing & Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  We'll test all upgrades and optimize your system for maximum performance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Laptop Performance?</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Contact us today for a free consultation. We'll help you identify the best upgrades for your specific laptop model and use case.
          </p>
          <Button size="lg">Get a Free Upgrade Consultation</Button>
        </div>
      </div>
    </MainLayout>
  );
} 