

create database practice5_1_3;
use practice5_1_3;

create table customers(
id int not null auto_increment primary key,
name varchar(50) not null,
email varchar(30) not null
);


create table orders(
id int not null auto_increment primary key,
customer_id int not null,
order_amount decimal(10,2),
order_date date not null,
foreign key (customer_id) references customers(id)
);
INSERT INTO customers (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Alice Johnson', 'alice@example.com'),
('Bob Brown', 'bob@example.com'),
('Emily Wilson', 'emily@example.com');

-- Insert data into orders table with order_date within the current year
INSERT INTO orders (customer_id, order_amount, order_date) VALUES
(1, 120.50, '2024-03-10'),
(2, 150.25, '2024-02-15'),
(3, 180.75, '2024-01-20'),
(4, 90.00, '2024-03-05'),
(5, 200.00, '2024-02-28'),
(1, 110.00, '2024-03-01'),
(1, 130.00, '2024-02-10'),
(3, 170.00, '2024-01-25'),
(4, 140.00, '2024-03-08'),
(4, 160.00, '2024-02-20');

-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- along with the total amount they have spent on all orders and the total amount they have spent on orders made in the last 30 days.

		select c.name as customer_name,
		sum(o.order_amount) as TotalAmount,
		sum( 
			   case
					when datediff(current_date,order_date) > 30
					then o.order_amount
					else 0 
				end
		) as  total_spent_last_30_days
		from customers as c
		inner join orders as o
		on c.id = o.customer_id
		group by o.customer_id;