"use client";

import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Laptop Experts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sri Lanka&apos;s trusted laptop store for brand new and used laptops, repair services, and accessories.
            </p>
            <div className="flex items-center gap-1 text-sm mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>123 Main Street, Colombo, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-1 text-sm mb-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>+94 77 123 4567</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@laptopexperts.lk</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/laptops/new" className="text-sm hover:text-primary transition-colors">
                Brand New Laptops
              </Link>
              <Link href="/laptops/used" className="text-sm hover:text-primary transition-colors">
                Used Laptops
              </Link>
              <Link href="/services" className="text-sm hover:text-primary transition-colors">
                Repair Services
              </Link>
              <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/services/repair" className="text-sm hover:text-primary transition-colors">
                Laptop Repair
              </Link>
              <Link href="/services/upgrade" className="text-sm hover:text-primary transition-colors">
                Hardware Upgrades
              </Link>
              <Link href="/services/data-recovery" className="text-sm hover:text-primary transition-colors">
                Data Recovery
              </Link>
              <Link href="/services/os-installation" className="text-sm hover:text-primary transition-colors">
                OS Installation
              </Link>
              <Link href="/services/cleaning" className="text-sm hover:text-primary transition-colors">
                Laptop Cleaning
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="flex gap-2 flex-wrap">
              <div className="bg-muted h-8 w-12 rounded-md flex items-center justify-center text-xs">Visa</div>
              <div className="bg-muted h-8 w-12 rounded-md flex items-center justify-center text-xs">MC</div>
              <div className="bg-muted h-8 w-12 rounded-md flex items-center justify-center text-xs">Amex</div>
              <div className="bg-muted h-8 w-12 rounded-md flex items-center justify-center text-xs">PayPal</div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Laptop Experts. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Shipping Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
} 