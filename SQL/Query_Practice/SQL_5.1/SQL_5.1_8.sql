
create database practice5_1_8;
use practice5_1_8;


CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    price DECIMAL(10, 2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO customers (customer_name) VALUES
('Alice'),
('Bob'),
('Charlie');

INSERT INTO products (product_name, price) VALUES
('Ball', 120.00),
('Pen', 80.00),
('glasses', 150.00),
('laptop stand', 90.00);

INSERT INTO orders (customer_id, product_id) VALUES
(1, 4),
(2, 4),
(3, 1),
(1, 2),
(2, 3),
(3, 2),
(2, 1),
(2, 2),
(3, 3),
(3, 4);

-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table,
--  but have not made any orders for products in the "products" table with a price greater than $100.

	
    SELECT c.customer_name,p.product_name,p.price FROM customers AS c
    inner JOIN orders AS o ON c.customer_id = o.customer_id
    LEFT JOIN products AS p ON o.product_id = p.product_id
    where p.product_id is null or p.price <=100;
    

    
