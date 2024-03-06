-- Write an SQL query to report all customers who never order anything. Return the result table in any order.
CREATE TABLE Customers(
id int not null auto_increment,
name varchar(20) not null,
primary key(id)
);

CREATE TABLE Orders(
id int not null auto_increment,
customerId int not null,
primary key(id),
foreign key(customerId) references Customers(id)
);
INSERT INTO Customers(NAME)
VALUES
("Joe"),
("Henry"),
("Sam"),
("Max");

INSERT INTO orders(CustomerId)
VALUES
(3),
(1);
SELECT name AS Customers FROM Customers  LEFT JOIN Orders ON Customers.id = Orders.CustomerId WHERE orders.id is NULL;
