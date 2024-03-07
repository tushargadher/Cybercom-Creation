-- Case 2
-- Consider the following table structure for a store's inventory
-- Write a query to retrieve the name and price of all items in the inventory where the quantity is greater than 0 and the category is 'electronics', sorted in descending order by price.alter
CREATE TABLE inventory(
id int not null auto_increment,
name varchar(255),
quantity int not null,
price DECIMAL(10,2),
category VARCHAR(50),
primary key(id)
);

insert into inventory(name,quantity,price,category)
values
('Mobile',25,25000,'electronics'),
('Laptop',250,50000,'electronics'),
('Table',205,5000,'furniture'),
('T-Shirt',0,500,'Clothes'),
('Travel bag',100,1500,'Luggage'),
('Table Fen',0,1500,'electronics');

select name,price from inventory where quantity>0 and category='electronics';