-- Write an SQL query to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead. Return the result table in any order
CREATE TABLE PERSONS(
personID int not null auto_increment,
lastName varchar(20) not null,
firstName varchar(20) not null,
primary key(personID)
);
INSERT INTO PERSONS(lastName,firstName)
VALUES
('Wang','Allen'),
('Alice','Bob');
SELECT * FROM PERSONS;

CREATE TABLE ADDRESS(
addressId int not null auto_increment,
personId int not null,
city varchar(20),
state varchar(20),
primary key(addressId)
);

INSERT INTO ADDRESS(personId,city,state)
VALUES
(2,'NEW YORK CITY','NEW YORK'),
(3,'LEETCODE','CALIFORNIA');

SELECT P.firstName as firstName,P.lastName as lastName,A.city as city,A.state as state
FROM PERSONS AS P 
LEFT JOIN ADDRESS AS A 
ON P.personId = A.personId; 