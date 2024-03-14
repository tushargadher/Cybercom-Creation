
create database practice5_1_10;
use practice5_1_10;
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50)
);


CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    country_id INT,
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE countries (
    country_id INT PRIMARY KEY,
    country_name VARCHAR(50)
);

INSERT INTO countries (country_id, country_name) VALUES
(1, 'USA'),
(2, 'UK'),
(3, 'Canada');

INSERT INTO products (product_id, product_name) VALUES
(1, 'Hair Comb'),
(2, 'Hair Wex'),
(3, 'Knife'),
(4, 'Table');

INSERT INTO customers (customer_id, customer_name, country_id) VALUES
(1, 'Alice', 1),
(2, 'Bob', 2),
(3, 'Charlie', 1),
(4, 'David', 2),
(5, 'Emma', 3);

INSERT INTO orders (order_id, customer_id, product_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 3),
(5, 5, 1),
(6, 1, 2),
(7, 2, 2),
(8, 3, 1);

-- 10.	Write a SQL query to retrieve the names of all products in the "products" table that have been ordered by customers in more than one country, 
-- along with the names of the countries where the products have been ordered.

select 
	p.product_name,
    GROUP_CONCAT(distinct crty.country_name) as Countries 
from products as p
inner join orders as o on p.product_id = o.product_id
inner join customers as c on c.customer_id=o.customer_id
left join countries as crty on c.country_id = crty.country_id
group by p.product_id
having count(crty.country_id)>1;

