-- Use the database
USE laptopexpert;

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Laptops', 'laptops', 'All types of laptops'),
('Ultrabooks', 'ultrabooks', 'Thin and light laptops', 1),
('Gaming Laptops', 'gaming-laptops', 'High-performance laptops for gaming', 1),
('Business Laptops', 'business-laptops', 'Laptops for professional use', 1),
('Student Laptops', 'student-laptops', 'Affordable laptops for students', 1);

-- Insert products
INSERT INTO products (title, slug, image, price, original_price, category_id, condition, stock, rating, reviews, description, is_featured) VALUES
('MacBook Pro 14"', 'macbook-pro-14', '/images/laptops/macbook-pro-14.jpg', 399000, 429000, 2, 'New', 10, 4.9, 120, 'The MacBook Pro 14" with M1 Pro chip delivers extraordinary performance and battery life.', TRUE),
('Dell XPS 13', 'dell-xps-13', '/images/laptops/dell-xps-13.jpg', 299000, 320000, 2, 'New', 5, 4.8, 85, 'The Dell XPS 13 features a stunning 4K display and powerful Intel processor.', TRUE),
('ASUS ROG Strix G15', 'asus-rog-strix-g15', '/images/laptops/asus-rog.jpg', 350000, 390000, 3, 'New', 8, 4.7, 64, 'The ASUS ROG Strix G15 is a powerful gaming laptop with NVIDIA RTX graphics.', TRUE),
('Lenovo ThinkPad X1 Carbon', 'thinkpad-x1-carbon', '/images/laptops/thinkpad-x1.jpg', 280000, 310000, 4, 'New', 12, 4.6, 93, 'The ThinkPad X1 Carbon is a premium business laptop with robust security features.', FALSE),
('HP Pavilion 15', 'hp-pavilion-15', '/images/laptops/hp-pavilion.jpg', 180000, 200000, 5, 'New', 15, 4.3, 47, 'The HP Pavilion 15 offers good performance at an affordable price for students.', FALSE),
('Acer Swift 3', 'acer-swift-3', '/images/laptops/acer-swift.jpg', 165000, 185000, 5, 'New', 7, 4.2, 38, 'The Acer Swift 3 is a slim and lightweight laptop perfect for everyday use.', FALSE);

-- Insert product specifications
INSERT INTO product_specifications (product_id, processor, ram, storage, display, graphics, battery, weight, ports, operating_system, warranty) VALUES
(1, 'Apple M1 Pro 10-core', '16GB unified memory', '512GB SSD', '14.2-inch Liquid Retina XDR display', 'Apple 16-core GPU', 'Up to 17 hours', '1.6 kg', '3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3', 'macOS', '1 year'),
(2, 'Intel Core i7-1165G7', '16GB LPDDR4x', '512GB NVMe SSD', '13.4-inch 4K UHD+ (3840 x 2400) touch display', 'Intel Iris Xe Graphics', 'Up to 12 hours', '1.2 kg', '2x Thunderbolt 4, microSD card reader', 'Windows 11 Pro', '1 year'),
(3, 'AMD Ryzen 9 5900HX', '16GB DDR4', '1TB NVMe SSD', '15.6-inch Full HD (1920 x 1080) 300Hz', 'NVIDIA GeForce RTX 3070 8GB', 'Up to 8 hours', '2.3 kg', '3x USB 3.2 Gen 1, 1x USB 3.2 Gen 2 Type-C, HDMI 2.0b, RJ45', 'Windows 11 Home', '2 years'),
(4, 'Intel Core i7-1165G7', '16GB LPDDR4x', '512GB PCIe SSD', '14-inch 2K (2560 x 1440) IPS', 'Intel Iris Xe Graphics', 'Up to 15 hours', '1.1 kg', '2x Thunderbolt 4, 2x USB 3.2 Gen 1, HDMI', 'Windows 11 Pro', '3 years'),
(5, 'AMD Ryzen 5 5500U', '8GB DDR4', '512GB NVMe SSD', '15.6-inch Full HD (1920 x 1080)', 'AMD Radeon Graphics', 'Up to 8 hours', '1.7 kg', '2x USB 3.2, 1x USB 2.0, HDMI, RJ45', 'Windows 11 Home', '1 year'),
(6, 'Intel Core i5-1135G7', '8GB LPDDR4X', '512GB PCIe NVMe SSD', '14-inch Full HD (1920 x 1080) IPS', 'Intel Iris Xe Graphics', 'Up to 10 hours', '1.2 kg', '1x USB Type-C, 2x USB 3.2, HDMI', 'Windows 11 Home', '1 year');

-- Insert product features
INSERT INTO product_features (product_id, feature) VALUES
(1, 'M1 Pro chip for extraordinary performance and battery life'),
(1, 'Stunning Liquid Retina XDR display with extreme dynamic range'),
(1, 'Studio-quality mic array captures your voice in amazing detail'),
(1, 'Six-speaker sound system with force-cancelling woofers'),
(1, 'Up to 17 hours of battery life'),
(2, 'InfinityEdge display for a nearly borderless viewing experience'),
(2, '11th Gen Intel Core processors with Iris Xe graphics'),
(2, 'Precision touchpad with seamless glass'),
(2, 'Machined aluminum construction for durability'),
(2, 'Killer Wi-Fi 6 technology for fast and reliable internet'),
(3, 'NVIDIA GeForce RTX 3070 GPU for ultimate gaming performance'),
(3, '300Hz refresh rate display for ultra-smooth gameplay'),
(3, 'ROG Intelligent Cooling thermal system'),
(3, 'Per-key RGB keyboard with 4 zones'),
(3, 'Comprehensive connectivity options'),
(4, 'Ultra-lightweight carbon fiber construction'),
(4, 'Military-grade durability (MIL-STD-810G certified)'),
(4, 'ThinkShutter privacy camera cover'),
(4, 'Fingerprint reader integrated with power button'),
(4, 'Rapid Charge technology (80% in 1 hour)'),
(5, 'Dual speakers with HP Audio Boost'),
(5, 'HP Fast Charge (50% in 45 minutes)'),
(5, 'HP True Vision HD camera'),
(5, 'Full-size keyboard with numeric keypad'),
(5, 'Energy-efficient EPEAT Silver registered'),
(6, 'Ultra-thin and lightweight design'),
(6, 'Fingerprint reader for secure login'),
(6, 'Backlit keyboard for working in low light'),
(6, 'Narrow-bezel display for more screen real estate'),
(6, 'Fast charging support');

-- Insert product images
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, '/images/laptops/macbook-pro-14.jpg', TRUE),
(1, '/images/laptops/macbook-pro-14-open.jpg', FALSE),
(1, '/images/laptops/macbook-pro-14-side.jpg', FALSE),
(2, '/images/laptops/dell-xps-13.jpg', TRUE),
(2, '/images/laptops/dell-xps-13-open.jpg', FALSE),
(2, '/images/laptops/dell-xps-13-side.jpg', FALSE),
(3, '/images/laptops/asus-rog.jpg', TRUE),
(3, '/images/laptops/asus-rog-open.jpg', FALSE),
(4, '/images/laptops/thinkpad-x1.jpg', TRUE),
(5, '/images/laptops/hp-pavilion.jpg', TRUE),
(6, '/images/laptops/acer-swift.jpg', TRUE);

-- Insert services
INSERT INTO services (title, slug, description, price, duration, icon) VALUES
('Laptop Repair', 'laptop-repair', 'Professional laptop repair service for all brands and models.', 5000, '1-3 days', 'tools'),
('Data Recovery', 'data-recovery', 'Recover your important files and data from damaged hard drives.', 8000, '2-5 days', 'database'),
('Virus Removal', 'virus-removal', 'Complete virus and malware removal with system protection setup.', 3000, '1-2 days', 'shield'),
('Operating System Installation', 'os-installation', 'Clean installation of Windows, macOS, or Linux with all necessary drivers.', 4000, '1 day', 'laptop'),
('Hardware Upgrade', 'hardware-upgrade', 'Upgrade your laptop components for better performance.', 2500, 'Same day', 'memory'),
('Laptop Cleaning', 'laptop-cleaning', 'Deep cleaning of laptop internals to improve cooling and performance.', 3500, 'Same day', 'brush');

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@laptopexpert.com', '$2b$10$gQk5xq0.CpbL6qPmF5TRqOJV3a2YfyP7HXQ7mj.V2R6D5n9kBJnAO', 'admin'), -- Password: admin123
('John Doe', 'john@example.com', '$2b$10$zP5H.exT6syHX5XUgixsw.GzZcK4XS.xJ7XV7thRgRnQw83oZuQc.', 'customer'); -- Password: password123

-- Insert sample orders
INSERT INTO orders (user_id, status, total, shipping_address, shipping_cost, payment_method, payment_status) VALUES
(2, 'delivered', 299000, '123 Main St, Colombo 06, Sri Lanka', 0, 'Cash on Delivery', 'paid'),
(2, 'processing', 353500, '123 Main St, Colombo 06, Sri Lanka', 3500, 'Bank Transfer', 'pending');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 2, 1, 299000),
(2, 3, 1, 350000); 