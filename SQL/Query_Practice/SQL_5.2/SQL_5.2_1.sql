create database practice5_2;
use practice5_2;

create table customers(
customer_id int not null primary key auto_increment,
customer_name varchar(30) not null,
customer_city varchar(30) not null
);

create table category(
category_id int not null primary key auto_increment,
category_name varchar(30) not null
);

create table products(
product_id int not null primary key auto_increment,
product_name varchar(30) not null,
category_id int not null,
price decimal(10,2),
foreign key(category_id) references category(category_id)
);
create table employees(
emp_id int not null auto_increment primary key,
emp_name varchar(30) not null,
emp_city varchar(30) not null
);
create table orders(
order_id int not null primary key auto_increment,
customer_id int not null,
sold_by int not null,
product_id int not null,
foreign key(customer_id) references customers(customer_id),
foreign key(product_id) references products(product_id),
foreign key(sold_by) references employees(emp_id)
);



INSERT INTO customers (customer_name, customer_city) VALUES
('Tushar', 'Delhi'),
('Deep', 'Delhi'),
('Fenil', 'Bangalore'),
('Dhruv', 'Kolkata'),
('Aniket', 'Chennai');

INSERT INTO category (category_name) VALUES
('Electronics'),
('Clothing'),
('Books');

INSERT INTO products (product_name, category_id,price) VALUES
('Laptop', 1,150.00),
('T-shirt', 2,160.00),
('Mahabharat', 3,60.00),
('Mobile Phone', 1,190.00),
('Shirt', 2,90.00),
('Digital Watch', 1,140.00),
('Mouse', 1,190.00),
('Charger', 2,90.00),
('Printer', 1,140.00),
('AC', 1,350.00);

INSERT INTO employees (emp_name, emp_city) VALUES
('Ramesh', 'Delhi'),
('Suresh', 'Mumbai'),
('Rajesh', 'Bangalore'),
('Amit', 'Kolkata'),
('Anita', 'Chennai');

INSERT INTO orders (customer_id,sold_by,product_id) VALUES
(1,1,1),
(2,2,4),
(3,3,3),
(1,4,4),
(2,1,1),
(3,5,5),
(2,5,2),
(2,2,2),
(4,3,2),
(4,2,5),
(4,1,3),
(5,3,2),
(5,2,5),
(4,1,1),
(5,2,6),
(1,2,6),
(1,1,7),
(1,2,9),
(1,4,10);



-- 1.	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, 
-- along with the total amount they have spent on all orders. The output should be sorted by the total amount spent in descending order.

   select c.customer_name ,sum(p.price) as TotalOrders from customers as c
   inner join orders as o
   on c.customer_id = o.customer_id
   inner join products as p
   on o.product_id = p.product_id
   inner join category as cat
   on p.category_id = cat.category_id
   where cat.category_id = 1
   group by o.customer_id
   ORDER BY TotalOrders DESC;
   -- little mistake
  
  
  
-- 2.	Write a SQL query to retrieve the names of all employees who have sold at least one product in the "Clothing" category, 
-- along with the total revenue they have generated from those sales. The output should be sorted by total revenue generated in descending order.

   select e.emp_name ,count(o.sold_by) as TotalSales,sum(p.price) as TotalRevenue from employees as e
   inner join orders as o
   on e.emp_id = o.sold_by
   inner join products as p
   on p.product_id = o.product_id
   inner join category as cat
   on p.category_id = cat.category_id
   where cat.category_id = 2
   group by e.emp_id
   order by TotalRevenue desc;



-- 3.	Write a SQL query to retrieve the names of all customers who have placed orders for products in both the "Electronics" and "Clothing" categories. 
-- The output should only include customers who have ordered products in both categories

   select c.customer_name,GROUP_CONCAT(p.product_name) as ProductNames from customers as c
   inner join orders as o
   on c.customer_id = o.customer_id
   inner join products as p
   on p.product_id = o.product_id
   inner join category as cat
   on p.category_id = cat.category_id
   where cat.category_id in(1,2)
   group by c.customer_id
   having count(distinct category_name) =2;
   
   -- 4.	Write a SQL query to retrieve the names of all employees who have sold at least one product to a customer who has a 
   -- shipping address in the same city as the employee. The output should only include employees who have made at least one such sale.

      select e.emp_name from employees as e
      inner join orders as o
      on e.emp_id = o.sold_by
      inner join customers as c
      on c.customer_id = o.customer_id
	  where c.customer_city = e.emp_city
      group by e.emp_id;


      -- to see employee and customer city 
      select e.emp_name,c.customer_name,e.emp_city,c.customer_city from employees as e
      inner join orders as o
      on e.emp_id = o.sold_by
      inner join customers as c
      on c.customer_id = o.customer_id
      group by e.emp_name,c.customer_name,e.emp_city,c.customer_city;

-- 5.	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, 
     -- but have never placed an order for products in the "Clothing" category.
     
     select c.customer_name,GROUP_CONCAT(cat.category_name) as OrderCategoris from customers as c
     inner join orders as o
     on c.customer_id = o.customer_id
     inner join products as p
     on p.product_id = o.product_id
     inner join category as cat
     on p.category_id = cat.category_id
     group by c.customer_id
     having sum(cat.category_id = 1) > 0 AND sum(cat.category_id = 2) = 0;
     
     
     
     -- 6.	Write a SQL query to retrieve the names of all employees who have sold at least one product to customers who have placed orders for
     -- products in the "Electronics" category, but have never placed an order for products in the "Clothing" category. 
     -- The output should only include employees who have made at least one such sale
     

	 select e.emp_name from employees as e 
     inner join orders as o
	 on e.emp_id = o.sold_by
	 inner join customers as c
	 on  c.customer_id = o.customer_id
     inner join products as p
     on p.product_id = o.product_id
     inner join category as cat
     on p.category_id = cat.category_id
     group by e.emp_id
     having sum(cat.category_id = 1) > 0 AND sum(cat.category_id = 2) = 0;
     
     -- 7.	Write a SQL query to retrieve the names of all customers who have placed orders for more 
     -- than five different products in the "Electronics" category.
     
     select c.customer_name,count(distinct p.product_id) as ElectronicsItems from customers as c
     inner join orders as o 
     on c.customer_id = o.customer_id
     inner join products as p 
     on p.product_id = o.product_id
     inner join category as cat
     on cat.category_id=p.category_id
     where cat.category_id = 1
     group by c.customer_id
     having count(distinct p.product_id)>5;
     
     
  
     -- 8.	Write a SQL query to retrieve the names of all employees who have sold products to customers who have placed orders for more than 
     -- five different products in the "Electronics" category. The output should only include employees who have made at least one such sale.
     
     select e.emp_name from employees as e
     inner join orders as o
     on  e.emp_id=o.sold_by 
     inner join customers as c 
     on c.customer_id = o.customer_id
     inner join products as p 
     on p.product_id = o.product_id
     inner join category as cat
     on cat.category_id=p.category_id
     where cat.category_id = 1
     group by e.emp_name,e.emp_id
     having count(distinct p.product_id)>5;
     
     -- this also
     
     
   
