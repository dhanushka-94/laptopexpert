"use client";

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Cpu, HardDrive, Wrench, Waves, Monitor, Database } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: 'Laptop Repair',
    description: 'Professional repair services for all laptop brands and models with quick turnaround time.',
    icon: Wrench,
    link: '/services/repair',
  },
  {
    title: 'Hardware Upgrades',
    description: 'Boost your laptop performance with RAM, SSD, and other hardware upgrades.',
    icon: Cpu,
    link: '/services/upgrade',
  },
  {
    title: 'Data Recovery',
    description: 'Recover your important files and data from damaged or corrupted storage devices.',
    icon: Database,
    link: '/services/data-recovery',
  },
  {
    title: 'OS Installation',
    description: 'Clean installation of Windows, macOS, or Linux operating systems with all necessary drivers.',
    icon: HardDrive,
    link: '/services/os-installation',
  },
  {
    title: 'Screen Replacement',
    description: 'Replace cracked or damaged laptop screens with high-quality compatible displays.',
    icon: Monitor,
    link: '/services/screen-replacement',
  },
  {
    title: 'Laptop Cleaning',
    description: 'Professional cleaning services to remove dust and improve cooling performance.',
    icon: Waves,
    link: '/services/cleaning',
  },
];

export function ServicesSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <ScrollAnimation>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Expert Laptop Services</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              We offer a comprehensive range of professional laptop services to keep your device running smoothly
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ScrollAnimation 
              key={index} 
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="bg-card transition-all hover:shadow-lg h-full">
                  <CardHeader>
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <service.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={service.link}>Learn More</a>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
        
        <ScrollAnimation delay={0.6} direction="up">
          <div className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="px-8" asChild>
                <a href="/services">View All Services</a>
              </Button>
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
} 