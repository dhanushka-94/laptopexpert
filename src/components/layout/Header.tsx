"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Menu, Headphones, Wrench, User, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getProducts } from '@/lib/api-util';

// Define interface for category
interface Category {
  id: number;
  name: string;
  slug: string;
}

// Define interface for search suggestion
interface SearchSuggestion {
  id: string | number;
  name: string;
  slug: string;
  image?: string;
}

export function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      // Redirect to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle click outside suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch product data for suggestions
  useEffect(() => {
    async function fetchProductsForSuggestions() {
      const allProducts = await getProducts();
      if (Array.isArray(allProducts)) {
        setProducts(allProducts);
      }
    }
    
    fetchProductsForSuggestions();
  }, []);

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = products
        .filter(product => {
          const name = (product.name || product.title || '').toLowerCase();
          const specs = typeof product.specs === 'string' 
            ? product.specs.toLowerCase() 
            : Object.values(product.specs || {}).join(' ').toLowerCase();
          
          return name.includes(query) || specs.includes(query);
        })
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          name: product.name || product.title || 'Unknown Product',
          slug: product.slug || product.id,
          image: product.image || product.image_url
        }));
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] pr-0">
              <nav className="flex flex-col gap-4 mt-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image 
                    src="/laptop_expert_lk_logo.png" 
                    alt="Laptop Experts Logo" 
                    width={150} 
                    height={40} 
                  />
                </Link>
                
                <div className="relative my-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <form onSubmit={handleSearch}>
                  <Input
                    type="search"
                    placeholder="Search laptops..."
                    className="pl-8 rounded-lg w-full bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  
                  {/* Mobile Suggestions */}
                  {showSuggestions && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute z-10 mt-1 w-full rounded-md bg-background shadow-lg border border-border"
                    >
                      {suggestions.map((suggestion) => (
                        <Link 
                          key={suggestion.id} 
                          href={`/product/${suggestion.slug}`}
                          onClick={() => setShowSuggestions(false)}
                          className="flex items-center px-4 py-2 hover:bg-muted transition-colors text-sm"
                        >
                          {suggestion.image && (
                            <div className="w-8 h-8 mr-2 relative flex-shrink-0">
                              <Image 
                                src={suggestion.image} 
                                alt={suggestion.name} 
                                fill 
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          <span className="truncate">{suggestion.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-2 space-y-1">
                  <h3 className="text-xs text-muted-foreground font-medium px-2 py-1">
                    Products
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/laptops/new" className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                      Brand New Laptops
                    </Link>
                    <Link href="/laptops/used" className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                      Used Laptops
                    </Link>
                    
                    {/* Categories section in mobile menu */}
                    <div className="py-1">
                      <h4 className="text-xs text-muted-foreground px-2 py-1">Categories</h4>
                      {loading ? (
                        <div className="px-2 py-1 text-sm text-muted-foreground">Loading...</div>
                      ) : (
                        categories.map(category => (
                          <Link 
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                    
                    <Link href="/accessories" className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                      <Headphones className="h-4 w-4" />
                      <span>Accessories</span>
                    </Link>
                  </motion.div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xs text-muted-foreground font-medium px-2 py-1">
                    Services
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/services" className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                      <Wrench className="h-4 w-4" />
                      <span>Repair Services</span>
                    </Link>
                    <Link href="/services/upgrade" className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                      Hardware Upgrades
                    </Link>
                    <Link href="/services/os-installation" className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                      OS Installation
                    </Link>
                  </motion.div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xs text-muted-foreground font-medium px-2 py-1">
                    About
                  </h3>
                  <Link href="/contact" className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/about" className="block px-2 py-1.5 text-sm hover:bg-muted rounded-lg transition-colors">
                    About Us
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center">
            <Image 
              src="/laptop_expert_lk_logo.png" 
              alt="Laptop Experts Logo" 
              width={180} 
              height={40} 
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {/* All Products link removed */}
          
          {/* Categories dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors p-0">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {loading ? (
                <DropdownMenuItem disabled>Loading categories...</DropdownMenuItem>
              ) : (
                categories.map(category => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/laptops/new" className="text-sm font-medium hover:text-primary transition-colors">
            Brand New Laptops
          </Link>
          <Link href="/laptops/used" className="text-sm font-medium hover:text-primary transition-colors">
            Used Laptops
          </Link>
          <Link href="/accessories" className="text-sm font-medium hover:text-primary transition-colors">
            Accessories
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
            Repair Services
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {isSearchVisible ? (
              <motion.form 
                className="md:flex items-center absolute md:relative right-16 left-4 md:right-auto md:left-auto"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search laptops..."
                    className="w-full md:w-64 pl-8 rounded-full bg-background"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden absolute right-0 top-0" 
                    onClick={() => setIsSearchVisible(false)}
                  >
                    <span className="sr-only">Close search</span>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </Button>
                  
                  {/* Mobile Search Suggestions */}
                  {showSuggestions && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute z-10 mt-1 w-full rounded-md bg-background shadow-lg border border-border"
                    >
                      {suggestions.map((suggestion) => (
                        <Link 
                          key={suggestion.id} 
                          href={`/product/${suggestion.slug}`}
                          onClick={() => {
                            setShowSuggestions(false);
                            setIsSearchVisible(false);
                          }}
                          className="flex items-center px-4 py-2 hover:bg-muted transition-colors text-sm"
                        >
                          {suggestion.image && (
                            <div className="w-8 h-8 mr-2 relative flex-shrink-0">
                              <Image 
                                src={suggestion.image} 
                                alt={suggestion.name} 
                                fill 
                                className="object-cover rounded"
                                unoptimized
                              />
                            </div>
                          )}
                          <span className="truncate">{suggestion.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.form>
            ) : (
              <Button variant="ghost" size="icon" className="flex md:hidden" onClick={() => setIsSearchVisible(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </AnimatePresence>
          
          <Link href="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <motion.span 
                className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                0
              </motion.span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Desktop search below navigation */}
      <div className="hidden md:block border-t border-border">
        <div className="container px-4 md:px-6 py-2">
          <form className="flex items-center justify-center" onSubmit={handleSearch}>
            <div className="relative max-w-2xl w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search laptops..."
                className="w-full pl-10 py-5 rounded-md bg-background/50 border-muted text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Desktop Search Suggestions */}
              {showSuggestions && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 mt-1 w-full rounded-md bg-background shadow-lg border border-border"
                >
                  {suggestions.map((suggestion) => (
                    <Link 
                      key={suggestion.id} 
                      href={`/product/${suggestion.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center px-4 py-3 hover:bg-muted transition-colors text-base"
                    >
                      {suggestion.image && (
                        <div className="w-10 h-10 mr-3 relative flex-shrink-0">
                          <Image 
                            src={suggestion.image} 
                            alt={suggestion.name} 
                            fill 
                            className="object-cover rounded"
                            unoptimized
                          />
                        </div>
                      )}
                      <span className="truncate">{suggestion.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </header>
  );
} 