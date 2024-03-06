-- write an SQL query to delete all the duplicate emails, keeping only one unique email with the smallest id. Return the result table in any order.
CREATE TABLE PERSON(
id int auto_increment,
email varchar(30),
primary key(id)
);
INSERT INTO PERSON(email)
VALUES
("tushargadher@gmail.com"),
("ramesh@gmail.com"),
("suresh@gmail.com"),
("tushargadher@gmail.com");
commit;
SELECT * FROM PERSON ORDER BY id ASC;
DELETE p1 FROM person p1 JOIN person p2 ON p1.email = p2.email AND p1.id>p2.id;

