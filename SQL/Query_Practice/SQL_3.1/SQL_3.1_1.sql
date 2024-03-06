-- Case 1
-- Create a table called "customers" with the following columns: id (integer, primary key), name (text), email (text), and created_at (timestamp).
create database practice3;
use practice3;

create table customers(
id int not null auto_increment,
name text not null,
email text not null,
created_at timestamp default current_timestamp,
primary key(id)
);

insert into customers(name,email,created_at)
values
('John Smith','johnsmith@gmail.com','2022-01-01 10:00:00'),
('Jane Doe','janedoe@yahoo.com','2022-01-02 11:00:00'),
('Bob Johnson','jbobjohnson@hotmail.com','2022-01-03 12:00:00'),
('Sarah Lee','sarahlee@gmail.com','2022-01-04 13:00:00'),
('David Kim','davidkim@yahoo.com','2022-01-05 14:00:00');


-- 1.Write a query that selects all customers whose email address ends with "@gmail.com".
select * from customers where email LIKE '%@gmail.com';
 
-- 2.	Write a query that selects the customer with the earliest created_at date.
 select * from customers 
 where created_at =(select min(created_at) from customers);

-- 3.	Write a query that selects the name and email of customers who were created on or after January 3, 2022.
 select * from customers where created_at>='2022-01-03';
 
-- 4.	Write a query that updates the email address of the customer with id=5 to "davidkim@gmail.com".
     update customers
     set email='davidkim@gmail.com'
     where id=5;
     select * from customers;
     
-- 5.	Write a query that deletes the customer with id=2.
	 delete from customers where id=2;
     
-- 6.	Write a query that calculates the total number of customers in the "customers" table.
	 select count(*) as "total customers" from customers;