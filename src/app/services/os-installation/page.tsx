"use client";

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, Shield, MessageSquare, Monitor, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';

// Sample data for OS installation services
const OS_INSTALLATION_SERVICES = [
  {
    title: 'Windows 11 Installation',
    icon: Monitor,
    description: 'Clean installation of Windows 11 with all necessary drivers and updates',
    price: 'From Rs. 4,500',
    includes: 'Driver installation, basic software setup',
  },
  {
    title: 'Windows 10 Installation',
    icon: Monitor,
    description: 'Clean installation of Windows 10 with all necessary drivers and updates',
    price: 'From Rs. 4,000',
    includes: 'Driver installation, basic software setup',
  },
  {
    title: 'macOS Installation',
    icon: Monitor,
    description: 'Clean installation of macOS on compatible Apple hardware',
    price: 'From Rs. 5,000',
    includes: 'System optimization, software setup',
  },
  {
    title: 'Linux Installation',
    icon: Settings,
    description: 'Installation of popular Linux distributions (Ubuntu, Mint, Fedora)',
    price: 'From Rs. 3,500',
    includes: 'Driver configuration, basic setup',
  },
];

// Software packages
const SOFTWARE_PACKAGES = [
  {
    title: 'Basic Package',
    price: 'Rs. 1,500',
    includes: [
      'Web browsers (Chrome, Firefox)',
      'Antivirus protection',
      'Office suite (LibreOffice)',
      'PDF reader',
      'Media player',
      'Basic utilities'
    ]
  },
  {
    title: 'Professional Package',
    price: 'Rs. 3,000',
    includes: [
      'All Basic Package software',
      'Microsoft Office 365 setup',
      'Cloud storage configuration',
      'Remote assistance software',
      'Advanced security suite',
      'Backup solution'
    ]
  },
  {
    title: 'Creative Package',
    price: 'Rs. 4,000',
    includes: [
      'All Basic Package software',
      'GIMP or Photoshop Elements',
      'Audacity for audio editing',
      'Video editing software',
      'Digital art applications',
      'Publishing tools'
    ]
  }
];

export default function OSInstallationPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center mb-4 gap-2">
          <RefreshCw className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">OS Installation Services</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/2">
            <p className="text-xl mb-4">
              Professional operating system installation and setup services for all laptop brands.
            </p>
            <p className="text-muted-foreground mb-8">
              Whether you need a fresh Windows installation, want to try Linux, or need to reinstall macOS, our experts can help. We ensure all drivers and essential software are properly installed for optimal performance.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Clean Installation</h3>
                  <p className="text-sm text-muted-foreground">Fresh OS installation with no bloatware or unnecessary programs</p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Complete Driver Setup</h3>
                  <p className="text-sm text-muted-foreground">All hardware drivers installed and configured correctly</p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Data Backup Available</h3>
                  <p className="text-sm text-muted-foreground">Option to back up your important data before OS installation</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Book OS Installation
              </Button>
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <AspectRatio ratio={16/9} className="bg-card rounded-lg overflow-hidden">
              <div className="product-image-fallback w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <RefreshCw className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-medium mb-2">OS Installation Services</h3>
                <p className="text-muted-foreground">Image showing OS installation</p>
              </div>
            </AspectRatio>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Operating System Installation Options</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OS_INSTALLATION_SERVICES.map((service, index) => (
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
                      {service.includes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6">Software Packages</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Add a software package to your OS installation for a complete setup with all the applications you need.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOFTWARE_PACKAGES.map((pkg, index) => (
              <Card key={index} className="relative overflow-hidden">
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-xl font-medium text-primary mb-4">{pkg.price}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant={index === 1 ? "default" : "outline"} className="w-full">
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need a Fresh Start for Your Laptop?</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            A clean OS installation can significantly improve your laptop&apos;s performance and reliability. Contact us today to schedule your OS installation service.
          </p>
          <Button size="lg">Schedule OS Installation</Button>
        </div>
      </div>
    </MainLayout>
  );
} 