-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS laptopexpert;
USE laptopexpert;

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  stock INT NOT NULL DEFAULT 0,
  brand_id INT,
  category_id INT,
  specs JSON,
  image_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  payment_method VARCHAR(50),
  shipping_fee DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert some sample data for brands
INSERT INTO brands (name, logo_url) VALUES
  ('Dell', '/images/brands/dell.png'),
  ('HP', '/images/brands/hp.png'),
  ('Lenovo', '/images/brands/lenovo.png'),
  ('Apple', '/images/brands/apple.png'),
  ('Asus', '/images/brands/asus.png');

-- Insert some sample data for categories
INSERT INTO categories (name, description) VALUES
  ('Gaming', 'High-performance laptops for gaming enthusiasts'),
  ('Business', 'Professional laptops for business use'),
  ('Student', 'Affordable laptops for students'),
  ('Creator', 'Laptops optimized for creative professionals');

-- Insert some sample products
INSERT INTO products (name, slug, description, price, discount_price, stock, brand_id, category_id, specs, image_url, featured) VALUES
  ('Dell XPS 13', 'dell-xps-13', 'Dell XPS 13 - A premium ultrabook with exceptional build quality and performance', 250000.00, 230000.00, 15, 1, 2, '{"processor": "Intel Core i7", "ram": "16GB", "storage": "512GB SSD", "display": "13.4-inch 4K", "graphics": "Intel Iris Xe"}', '/images/laptops/dell-xps-13.jpg', TRUE),
  
  ('MacBook Pro 14', 'macbook-pro-14', 'Apple MacBook Pro 14 with M1 Pro chip - Power and efficiency in a portable package', 350000.00, 330000.00, 10, 4, 4, '{"processor": "Apple M1 Pro", "ram": "16GB", "storage": "1TB SSD", "display": "14-inch Liquid Retina XDR", "graphics": "16-core GPU"}', '/images/laptops/macbook-pro-14.jpg', TRUE),
  
  ('Lenovo ThinkPad X1', 'thinkpad-x1', 'Lenovo ThinkPad X1 Carbon - The ultimate business laptop with legendary durability', 280000.00, 260000.00, 8, 3, 2, '{"processor": "Intel Core i7", "ram": "16GB", "storage": "1TB SSD", "display": "14-inch FHD+", "graphics": "Intel Iris Xe"}', '/images/laptops/thinkpad-x1.jpg', FALSE),
  
  ('Asus ROG Strix', 'asus-rog-strix', 'ASUS ROG Strix - Gaming powerhouse with RGB lighting and high refresh rate display', 320000.00, 300000.00, 12, 5, 1, '{"processor": "AMD Ryzen 9", "ram": "32GB", "storage": "1TB SSD", "display": "15.6-inch 144Hz", "graphics": "NVIDIA RTX 3080"}', '/images/laptops/asus-rog.jpg', TRUE); 