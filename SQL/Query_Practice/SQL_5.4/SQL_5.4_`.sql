create database practice5_4;
use practice5_4;

create table customers(
customer_id int not null primary key auto_increment,
customer_name varchar(30) not null
);

create table products(
product_id int not null primary key auto_increment,
product_name varchar(30) not null,
product_category varchar(30) not null,
price decimal(10,2)
);

create table orders(
order_id int not null primary key auto_increment,
customer_id int not null,
product_id int not null,
foreign key(customer_id) references customers(customer_id),
foreign key(product_id) references products(product_id)
);
 create table returns(
order_id int not null primary key auto_increment,
customer_id int not null,
product_id int not null,
foreign key(customer_id) references customers(customer_id),
foreign key(product_id) references products(product_id)
 );

INSERT INTO customers (customer_name) VALUES
('John Doe'),
('Jane Smith'),
('Alice Johnson');

INSERT INTO products (product_name, product_category, price) VALUES
('Smartphone', 'Electronics', 599.99),
('Laptop', 'Electronics', 899.99),
('Headphones', 'Electronics', 99.99),
('T-shirt', 'Clothing', 19.99),
('Jeans', 'Clothing', 39.99),
('Sneakers', 'Footwear', 59.99);

INSERT INTO orders (customer_id, product_id) VALUES
(1, 2),
(2, 4),
(3, 3),
(1, 5),
(2, 1),
(3, 6),
(1, 3),
(2, 2),
(3, 4),
(1, 6);

INSERT INTO returns (order_id, customer_id, product_id) VALUES
(2, 2, 4),
(4, 1, 5),
(7, 1, 3),
(9, 2, 2),
(10, 3, 4);

-- 1.	Write a SQL query to retrieve the names of all customers who have made at least one order in the "orders" table and have not made any orders in the "returns" table.
--  
-- 2.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned at least one item in the "returns" table.
--  
-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned any items in the "returns" table.
--  
-- 4.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned more items than they have ordered.
--  
-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned more items than they have ordered.
--  
-- 6.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders.
--  
-- 7.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders, sorted by the total amount spent in descending order.
--  
-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in all categories.
--  
-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not ordered products in all categories.
--  
-- 10.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in at least two different categories.
