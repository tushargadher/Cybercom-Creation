
create database practice5_1_1;
use practice5_1_1;

create table customers(
id int not null auto_increment primary key,
name varchar(50) not null,
email varchar(30) not null
);


create table orders(
id int not null auto_increment primary key,
customer_id int not null,
order_amount decimal(10,2),
order_date date,
foreign key (customer_id) references customers(id)
);

INSERT INTO customers (name, email,order_date) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Alice Johnson', 'alice@example.com'),
('Bob Brown', 'bob@example.com'),
('Emily Wilson', 'emily@example.com'),
('Michael Lee', 'michael@example.com'),
('Sarah Taylor', 'sarah@example.com'),
('David Anderson', 'david@example.com'),
('Jessica Martinez', 'jessica@example.com'),
('Daniel Rodriguez', 'daniel@example.com'),
('Jennifer Garcia', 'jennifer@example.com'),
('Christopher Hernandez', 'christopher@example.com'),
('Lisa Martinez', 'lisa@example.com'),
('Matthew Lopez', 'matthew@example.com'),
('Ashley Gonzalez', 'ashley@example.com');

INSERT INTO orders (customer_id, order_amount,order_date) VALUES
(1, 110.00,'2023-11-05'),
(2, 120.00,'2023-11-05'),
(13, 130.00,'2023-11-05'),
(4, 140.00,'2023-11-05'),
(15, 150.00,'2023-11-25'),
(1, 160.00,'2023-03-15'),
(4, 170.00,'2024-02-05'),
(8, 180.00,'2024-02-05'),
(9, 190.00,'2023-06-05'),
(10, 200.00,'2024-01-05'),
(11, 210.00,'2023-11-05'),
(2, 220.00,'2023-11-05'),
(13, 230.00,'2023-11-05'),
(14, 240.00,'2023-11-05'),
(5, 250.00,'2023-11-05'),
(9, 260.00,'2023-01-05'),
(2, 270.00,'2023-04-05'),
(3, 280.00,'2023-06-05'),
(3, 290.00,'2023-12-15'),
(5, 300.00,'2023-01-05'),
(6, 310.00,'2023-01-05'),
(2, 320.00,'2023-01-05'),
(8, 330.00,'2024-01-05'),
(9, 340.00,'2024-03-05'),
(10, 350.00,'2024-01-05');

-- 1.	Write a SQL query to retrieve the top 10 customers who have made the most orders in the "orders" table, along with the total number of orders they have made.

select c.name ,count(o.customer_id) as TotalOrders
from customers as c
inner join orders as o 
on c.id = o.customer_id
group by o.customer_id
order by TotalOrders desc
limit 10;