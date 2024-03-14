
create database practice5_1_2;
use practice5_1_2;

create table employees(
id int not null auto_increment primary key,
name varchar(50) not null,
email varchar(30) not null
);


create table order_details(
id int not null auto_increment primary key,
employee_id int not null,
sold_amount decimal(10,2),
foreign key (employee_id) references employees(id)
);

INSERT INTO employees (name, email) VALUES
('Daniel Rodriguez', 'daniel@example.com'),
('Jennifer Garcia', 'jennifer@example.com'),
('Lisa Martinez', 'lisa@example.com'),
('Matthew Lopez', 'matthew@example.com'),
('Ashley Gonzalez', 'ashley@example.com');

INSERT INTO order_details (employee_id, sold_amount) VALUES
(1, 50000),
(2, 80000),
(3, 220000),
(4, 150000),
(5, 250000);

-- 2.	Write a SQL query to retrieve the names of all employees who have sold more than $100,000 worth of products in the "order_details" table, sorted by the amount sold in descending order.

select e.name,od.sold_amount as TotalAmount from employees as e
inner join order_details as od
on e.id = od.employee_id
where od.sold_amount > 100000
order by od.sold_amount desc;
