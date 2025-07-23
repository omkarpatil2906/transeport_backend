// -- 1. Create 'customers' table
// CREATE TABLE customers (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     full_name VARCHAR(100),
//     user_name VARCHAR(100),
//     email VARCHAR(150) UNIQUE,
//     contact_number VARCHAR(15),
//     password VARCHAR(255)
// );

// -- 2. Create 'customer_address' table
// CREATE TABLE customer_address (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     customer_id INT,
//     street VARCHAR(255),
//     city VARCHAR(100),
//     state VARCHAR(100),
//     pincode VARCHAR(10),
//     type ENUM('home', 'work', 'other'), -- or just VARCHAR(50) if you prefer
//     FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
// );


// CREATE TABLE users (
//      id INT AUTO_INCREMENT PRIMARY KEY, 
//      full_name VARCHAR(100),
//      user_name VARCHAR(100),
//      mobile_number VARCHAR(15),
//      email VARCHAR(150) UNIQUE,
//      address VARCHAR(150),
//      password VARCHAR(255),
//      isAgree bit
//  );
