"use client";

import { Card, CardContent } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Hiruni Perera',
    role: 'Software Engineer',
    image: '/images/testimonials/profile-1.jpg',
    content: 'The Dell XPS I purchased from Laptop Experts exceeded my expectations. The team helped me choose the perfect configuration for my development work, and their after-sales support is excellent!',
    rating: 5,
  },
  {
    name: 'Dinesh Kumar',
    role: 'University Student',
    image: '/images/testimonials/profile-2.jpg',
    content: 'I bought a used MacBook Pro for my university studies. The condition was excellent as advertised, and the price was much better than buying new. Their 6-month warranty gave me peace of mind.',
    rating: 5,
  },
  {
    name: 'Samantha Fernando',
    role: 'Graphic Designer',
    image: '/images/testimonials/profile-3.jpg',
    content: 'When my laptop screen cracked, Laptop Experts replaced it within 24 hours. Fast service, reasonable price, and they even cleaned the entire laptop. Highly recommended for repairs!',
    rating: 4,
  },
  {
    name: 'Akila Jayawardena',
    role: 'Business Owner',
    image: '/images/testimonials/profile-4.jpg',
    content: 'Laptop Experts has been our go-to supplier for all business laptops. Their bulk pricing and reliable service have made them an invaluable partner for our growing company.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <ScrollAnimation>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Don&apos;t just take our word for it — hear from our satisfied customers across Sri Lanka
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <ScrollAnimation 
              key={index} 
              delay={index * 0.15}
              direction={index % 2 === 0 ? 'up' : 'down'}
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card key={index} className="bg-card/50 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <motion.div 
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </motion.svg>
                      ))}
                    </motion.div>
                    
                    <motion.p 
                      className="text-sm mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                      &quot;{testimonial.content}&quot;
                    </motion.p>
                    
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Placeholder for user image */}
                        <div className="w-full h-full flex items-center justify-center text-primary font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                      </motion.div>
                      <div>
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
} 