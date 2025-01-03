
-- Create the database
CREATE DATABASE used_car_shop;

-- Use the database
USE used_car_shop;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the car listings table
CREATE TABLE car_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year YEAR NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the messages table for inquiries or chat
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the transactions table for payment integration
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    listing_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_method VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES car_listings(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (username, password, email) VALUES
('john_doe', '$2y$10$examplehashforpassword123', 'john@example.com'),
('jane_smith', '$2y$10$anotherexamplehash567', 'jane@example.com');

-- Insert sample car listings
INSERT INTO car_listings (title, brand, model, year, price, description, image_path, user_id) VALUES
('Sedan for Sale', 'Toyota', 'Camry', 2020, 20000.00, 'A reliable family car in excellent condition.', '/images/camry.jpg', 1),
('Compact Car', 'Honda', 'Civic', 2018, 15000.00, 'Great mileage and smooth driving experience.', '/images/civic.jpg', 2);

-- Insert sample messages
INSERT INTO messages (sender_id, receiver_id, message) VALUES
(1, 2, 'Is the Honda Civic still available?'),
(2, 1, 'Yes, it is! Would you like to schedule a test drive?');

-- Insert sample transactions
INSERT INTO transactions (user_id, listing_id, amount, payment_status, payment_method) VALUES
(1, 2, 15000.00, 'completed', 'credit_card');
