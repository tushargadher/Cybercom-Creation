-- Case 1 - Create a database called "sales" with three tables: "customers", "orders", and "products".

create database sales;
use sales;

CREATE TABLE customers(
customer_id int not null auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
email varchar(50) not null,
phone varchar(20) not null
);

CREATE TABLE orders(
order_id int not null auto_increment primary key,
order_date date not null,
customer_id int not null,
product_id int not null,
foreign key(customer_id) references customers(customer_id),
foreign key(product_id) references products(product_id)
);

CREATE TABLE products(
product_id int not null auto_increment primary key,
product_name varchar(30) not null,
unit_price decimal(10,2) not null,
description text not null
);

-- 1.	Insert at least five customers, five products, and ten orders into the respective tables.
    --  Make sure that at least two customers have multiple orders, and at least two products are included in multiple orders.
		INSERT INTO customers (first_name, last_name, email, phone)
        VALUES
		('John', 'Doe', 'john@gmail.com', '123-456-7890'),
		('Jane', 'Smith', 'jane@gmail.com', '234-567-8901'),
		('Michael', 'Johnson', 'michael@gmail.com', '345-678-9012'),
		('Emily', 'Williams', 'emily@gmail.com', '456-789-0123'),
		('David', 'Brown', 'david@gmail.com', '567-890-1234');

		INSERT INTO products (product_name, unit_price, description) VALUES
		('T-shirt', 19.99, 'Cotton T-shirt for casual wear'),
		('Jeans', 39.99, 'Denim jeans for everyday use'),
		('Running Shoes', 79.99, 'Sports shoes for running and jogging'),
		('Smartphone', 499.99, 'Latest smartphone model with advanced features'),
		('Laptop', 999.99, 'High-performance laptop for work and entertainment'),
		('Mobile', 29.99, 'Best Budget Mobile');
		
        

        INSERT INTO orders (order_date, customer_id, product_id) VALUES
		('2024-01-01', 1, 1),
		('2024-01-02', 2, 2),
		('2024-01-03', 2, 3),
		('2024-01-04', 5, 4),
		('2024-01-05', 5, 5),
		('2024-01-06', 1, 2),
		('2024-01-07', 2, 3),
		('2024-01-08', 3, 4),
		('2024-01-09', 4, 5),
		('2024-01-10', 5, 1);
 

-- 2.	Write a query that retrieves the customer's first name, last name, email, and the number of orders they have placed. The results should be ordered by the number of orders in descending order.

		select c.first_name,c.last_name,c.email,count(ord.customer_id) as TotalOrders 
        from customers as c
        inner join orders ord on c.customer_id = ord.customer_id
        group by ord.customer_id
        order by TotalOrders desc;
        
-- 3.	Write a query that retrieves the product name, the total number of orders for each product, and the total revenue generated by each product. The results should be ordered by the total revenue in descending order.

		select p.product_name ,
        count(p.product_id) as TotalOrders,
        sum(p.unit_price) as TotalRevenue
        from products as p
        left join orders as ord on p.product_id = ord.product_id
        group by p.product_id
        order by (p.unit_price) desc;
        
       --  fix isseu if the product total orders is zero show total revenue zero
        
-- 4.	Write a query that retrieves the first name, last name, email, and product name for each order. The results should only include orders where the customer has placed multiple orders.


		select c.first_name,c.last_name,c.email,p.product_name ,count(o.customer_id) as TotalOrder from
		orders as o
        inner join customers as c
        on c.customer_id = o.customer_id
        inner join products as p 
        on p.product_id = o.product_id
        group by c.customer_id, c.first_name, c.last_name, c.email, p.product_name
        having count(o.customer_id) >= 2;
        
        
-- 5.	Write a query that retrieves the first name, last name, and email for each customer who has placed at least one order for a product with a unit price greater than $50.

		select c.first_name,c.last_name,c.email,p.unit_price 
        from customers as c
        inner join orders as o
        on c.customer_id = o.customer_id
        inner join products as p
        on p.product_id = o.product_id
        having p.unit_price > 50;
        
        
        
-- 6.	Write a query that retrieves the product name and the number of times it has been ordered, but only includes products that have been ordered more than once.

		select p.product_name,count(o.product_id) as TotalOrders from 
		products as p
		inner join orders as o
		on p.product_id = o.product_id
        group by o.product_id
        having TotalOrders > 1;