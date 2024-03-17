create database practice5_4;
use practice5_4;

create table customers(
customer_id int not null primary key auto_increment,
customer_name varchar(30) not null
);

create table category(
category_id int not null auto_increment primary key,
category_name varchar(30) not null
);
create table products(
product_id int not null primary key auto_increment,
product_name varchar(30) not null,
product_category_id int not null,
price decimal(10,2),
foreign key(product_category_id) references category(category_id)
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
('Alice Johnson'),
('Bob Wilson');

INSERT INTO category(category_name) VALUES
('Electronics'),
('Clothing'),
('Footwear');






INSERT INTO products (product_name, product_category_id, price) VALUES
('Smartphone', 1, 599.99),
('Laptop', 1, 899.99),
('Headphones', 1, 99.99),
('T-shirt', 2, 19.99),
('Jeans', 2, 39.99),
('Sneakers', 3, 59.99);

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
(1, 6),
(4, 5);


INSERT INTO returns (order_id, customer_id, product_id) VALUES
(2, 2, 4),
(4, 1, 5),
(7, 1, 3),
(9, 2, 2),
(10, 3, 4);
INSERT INTO returns (order_id, customer_id, product_id) VALUES
(1, 4, 2),
(3, 4, 4);

-- 1.	Write a SQL query to retrieve the names of all customers who have made at least one order in the "orders" table and have not made any orders in the "returns" table.
    
       select c.customer_name from customers as c
       inner join orders as o 
       on o.customer_id = c.customer_id
       left join returns as r
       on r.customer_id  = c.customer_id 
       where r.customer_id is null;
       
       
-- 2.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned at least one item in the "returns" table.  

      select c.customer_name from customers as c
      inner join orders as o
      on o.customer_id = c.customer_id
      inner join returns as r
      on o.order_id = r.order_id
      group by c.customer_id;

-- 3.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned any items in the "returns" table.
  
        select c.customer_name from customers as c
        inner join orders as o
        on c.customer_id = o.customer_id
        left join returns as r
        on c.customer_id = r.customer_id
        where r.customer_id is null;
     


-- 4.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned more items than they have ordered.
		
        select c.customer_name,count(c.customer_id) as TotalOrders 
        from customers as c
		inner join orders as o
        on o.customer_id = c.customer_id
        group by c.customer_id
        having TotalOrders < (
									select count(r.customer_id) from
									returns as r 
                                    where r.customer_id = c.customer_id
                             );
        
        

-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned more items than they have ordered.


        select c.customer_name,count(c.customer_id) as TotalOrders 
        from customers as c
		inner join orders as o
        on o.customer_id = c.customer_id
        group by c.customer_id
        having TotalOrders > (
									select count(r.customer_id) from
									returns as r 
                                    where r.customer_id = c.customer_id
                             );


-- 6.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders.
  
       select c.customer_name,sum(p.price) as TotalAmount from customers as c
       inner join orders as o
       on o.customer_id = c.customer_id
       inner join products as p
       on p.product_id = o.product_id
       group by c.customer_id
	   having TotalAmount > 100;



-- 7.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders, 
-- sorted by the total amount spent in descending order.
  
	   select c.customer_name,sum(p.price) as TotalAmount from customers as c
       inner join orders as o
       on o.customer_id = c.customer_id
       inner join products as p
       on p.product_id = o.product_id
       group by c.customer_id
	   having TotalAmount > 100
       order by TotalAmount desc;


 
-- 8.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in all categories.
  
       select c.customer_name,group_concat(cat.category_name) as Categorys from customers as c
       inner join orders as o
       on o.customer_id = c.customer_id
       inner join products as p
       on p.product_id = o.product_id
       inner join category as cat
       on cat.category_id = p.product_category_id
       group by c.customer_id
       having count(distinct cat.category_id) = (select count(*) from category);
       


-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not ordered products in all categories.

       select c.customer_name,group_concat(cat.category_name) as Categorys from customers as c
       inner join orders as o
       on o.customer_id = c.customer_id
       inner join products as p
       on p.product_id = o.product_id
       inner join category as cat
       on cat.category_id = p.product_category_id
       group by c.customer_id
       having count(distinct cat.category_id) <> (select count(*) from category);
       

 
-- 10.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in at least two different categories.

       select c.customer_name,group_concat(cat.category_name) as Categorys from customers as c
       inner join orders as o
       on o.customer_id = c.customer_id
       inner join products as p
       on p.product_id = o.product_id
       inner join category as cat
       on cat.category_id = p.product_category_id
       group by c.customer_id
       having count(distinct cat.category_id) >= 2;
       