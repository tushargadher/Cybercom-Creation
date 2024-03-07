-- Case 4
-- Consider a table called "orders" with the following columns: "id", "customer_id", "order_date", "total_amount".
create table orders(
id int not null auto_increment primary key,
customer_id int not null,
order_date date not null,
total_amount decimal(10,2) not null
);

INSERT INTO orders (customer_id, order_date, total_amount) VALUES
(1, '2024-01-01', 1000.00),
(1, '2024-02-05', 1150.00),
(2, '2024-01-15', 1200.00),
(3, '2024-02-20', 2120.00),
(2, '2024-03-10', 3180.00),
(3, '2024-03-15', 490.00),
(1, '2024-04-01', 4210.00),
(2, '2024-04-05', 1030.00),
(3, '2024-05-10', 2200.00),
(1, '2024-05-15', 1440.00);

 -- Write a SQL query to calculate the total amount of orders for each customer, sorted in descending order by total amount.
 
 select customer_id,sum(total_amount) as 'Total Amount'
 from orders 
 group by customer_id 
 order by 'Total Amount' desc;