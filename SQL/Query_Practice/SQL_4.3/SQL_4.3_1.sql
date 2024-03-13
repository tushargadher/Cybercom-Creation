-- Case 1
-- Assume you are given access to a database with two tables: users and orders. 
create database orderManagment;
use orderManagment;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT not null,
    email TEXT not null,
    password TEXT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT not null,
    amount FLOAT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password)
VALUES
('Tushar Gadher','tushargadher@gmail.com','92029'),
('Jane Smith', 'jane@example.com', 'password456'),
('Alice Johnson', 'alice@example.com', 'password789'),
('Rocky','rocky@gmail.com','rocky123'),
('Doe','doe@example.com','123456');

INSERT INTO orders (user_id, amount, created_at)
VALUES
(1, 100.50, CURRENT_TIMESTAMP),
(2, 75.25, CURRENT_TIMESTAMP),
(1, 200.75, CURRENT_TIMESTAMP),
(3, 150.00, CURRENT_TIMESTAMP),
(3, 200.75, CURRENT_TIMESTAMP),
(3, 150.00, CURRENT_TIMESTAMP),
(5, 100.50, '2024-01-10 12:00:00'),
(2, 75.25, CURRENT_TIMESTAMP),
(5, 200.75, CURRENT_TIMESTAMP),
(3, 150.00, CURRENT_TIMESTAMP),
(5, 200.75, CURRENT_TIMESTAMP),
(1, 150.00, '2024-01-10 12:00:00');
  
  select current_timestamp;
-- 1.	Create a new user with the following information:
		-- name: John Doe
		-- email: john.doe@example.com
		-- password: 123456
		-- created_at: current timestamp
		-- updated_at: current timestamp

		insert into users(name,email,password,created_at,updated_at)
        values
        ('John Doe','john.doe@example.com','123456',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	
        
-- 2.	Retrieve the names and email addresses of all users who have placed at least one order.
		
		select u.name,u.email,count(o.user_id) as TotalOrder
        from users as u
        left join orders as o
        on u.id = o.user_id
        group by u.name,u.email,o.user_id
        having TotalOrder >= 1;
        
-- 3.	Retrieve the total amount of orders placed by each user, sorted in descending order of total amount.
		
        select u.name,coalesce(sum(o.amount),0) as TotalAmount 
        from users as u
        left join orders as o
        on u.id = o.user_id
        group by u.name
        order by TotalAmount desc;
        
        -- coalesce function return tha first not-null expression
        
-- 4.	Retrieve the email address of the user who has placed the most orders.

        select u.email,count(o.user_id) as TotalOrders 
        from users as u
        inner join orders as o
        on u.id = o.user_id
        group by u.email
        order by TotalOrders desc
        limit 1;
        
-- 5.	Retrieve the user IDs and the total amount of orders placed by users who have placed at least one order and whose total amount of orders exceeds $100.
		
        select u.id,count(o.user_id) as TotalOrders,sum(o.amount) as TotalAmount 
        from users as u
        inner join orders as o
        on u.id = o.user_id
        group by u.id
        having TotalOrders >= 1 and TotalAmount > 100;
        
		-- aliases are defined in the SELECT clause and are not accessible in the WHERE clause
        
        
-- 6.	Retrieve the number of users who have not placed any orders.

		select count(u.id) as TotalUsers
        from users as u
        left join orders as o
        on u.id = o.user_id
        where o.id is null;
       
-- 7.	Update the user with ID 1 to change their email address to "jane.doe@example.com".

		update users
        set email ='jane.doe@example.com' 
        where id =1;

-- 8.	Delete all orders placed by users whose email address contains the string "test".

        delete from orders
        where user_id =(select id from users where email like '%test%');
        
-- 9.	Retrieve the total amount of orders placed on each day of the current week, grouped by day.


        select date(created_at) as order_date , sum(amount) as TotalAmount
        from orders where week(created_at) = week(current_date) 
        group by order_date;
  
-- 10.	Retrieve the IDs and email addresses of users who have placed an order in the current year and whose email address is in the format "example.com".

        select u.id,u.email 
        from users as u
        inner join orders as o
        on u.id = o.user_id
        where Year(o.created_at) = Year(current_date) and u.email like '%example.com'
        group by u.id; 
        
        