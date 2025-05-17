-- Drop database if exists and create a new one
DROP DATABASE IF EXISTS laptopexpert;
CREATE DATABASE laptopexpert;
USE laptopexpert;

-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  condition_status VARCHAR(50) DEFAULT 'new',
  category_id INT,
  is_featured BOOLEAN DEFAULT FALSE,
  specs JSON,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Product features table
CREATE TABLE product_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  feature TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product images table
CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Gaming', 'gaming', 'Gaming laptops with high performance graphics'),
('Business', 'business', 'Professional laptops for business users'),
('Ultrabook', 'ultrabook', 'Thin and light laptops for productivity'),
('Budget', 'budget', 'Affordable laptops for everyday use');

-- Insert sample products
INSERT INTO products (name, slug, description, price, original_price, stock, image_url, condition_status, category_id, is_featured, specs) VALUES
('Dell XPS 13', 'dell-xps-13', 'Premium ultrabook with exceptional build quality', 250000, 280000, 10, '/images/laptops/dell-xps-13.jpg', 'new', 3, TRUE, '{"processor": "Intel Core i7", "ram": "16GB", "storage": "512GB SSD", "display": "13.4-inch 4K"}'),
('MacBook Pro 14', 'macbook-pro-14', 'Powerful laptop for creative professionals', 350000, 380000, 5, '/images/laptops/macbook-pro-14.jpg', 'new', 3, TRUE, '{"processor": "Apple M1 Pro", "ram": "16GB", "storage": "512GB SSD", "display": "14-inch Liquid Retina XDR"}'),
('ASUS ROG Strix', 'asus-rog-strix', 'High-performance gaming laptop', 320000, 350000, 8, '/images/laptops/asus-rog.jpg', 'new', 1, TRUE, '{"processor": "AMD Ryzen 9", "ram": "32GB", "storage": "1TB SSD", "display": "15.6-inch 144Hz"}'),
('Lenovo ThinkPad X1', 'lenovo-thinkpad-x1', 'Business laptop with excellent keyboard', 280000, 320000, 12, '/images/laptops/thinkpad-x1.jpg', 'new', 2, FALSE, '{"processor": "Intel Core i5", "ram": "16GB", "storage": "512GB SSD", "display": "14-inch FHD"}'),
('Acer Aspire 5', 'acer-aspire-5', 'Budget-friendly laptop for students', 120000, 140000, 15, '/images/laptops/acer-aspire.jpg', 'new', 4, FALSE, '{"processor": "AMD Ryzen 5", "ram": "8GB", "storage": "256GB SSD", "display": "15.6-inch FHD"}');

-- Insert product features
INSERT INTO product_features (product_id, feature) VALUES
(1, 'InfinityEdge display with minimal bezels'),
(1, 'CNC machined aluminum chassis'),
(1, 'Backlit keyboard with comfortable typing experience'),
(1, 'Thunderbolt 4 ports for fast data transfer'),
(2, 'M1 Pro chip for exceptional performance'),
(2, 'Stunning Liquid Retina XDR display'),
(2, 'Up to 17 hours of battery life'),
(2, 'Studio-quality mic array'),
(3, 'NVIDIA GeForce RTX graphics'),
(3, 'RGB backlit keyboard'),
(3, 'Advanced cooling system'),
(3, 'High refresh rate display for smooth gaming'),
(4, 'Military-grade durability'),
(4, 'TrackPoint pointing device'),
(4, 'All-day battery life'),
(4, 'Rapid Charge technology'),
(5, 'Affordable price point'),
(5, 'Thin and light design'),
(5, 'Ample connectivity options'),
(5, 'Good battery life');

-- Insert product images
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, '/images/laptops/dell-xps-13.jpg', TRUE),
(1, '/images/laptops/dell-xps-13-2.jpg', FALSE),
(1, '/images/laptops/dell-xps-13-3.jpg', FALSE),
(2, '/images/laptops/macbook-pro-14.jpg', TRUE),
(2, '/images/laptops/macbook-pro-14-2.jpg', FALSE),
(3, '/images/laptops/asus-rog.jpg', TRUE),
(3, '/images/laptops/asus-rog-2.jpg', FALSE),
(4, '/images/laptops/thinkpad-x1.jpg', TRUE),
(5, '/images/laptops/acer-aspire.jpg', TRUE); 