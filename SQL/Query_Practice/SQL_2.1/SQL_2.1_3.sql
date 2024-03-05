CREATE TABLE SALARY(
id int auto_increment,
name varchar(20) not null,
sex ENUM('F','M') not null,
salary int not null,
primary key (id)
);
select * from salary;
INSERT INTO SALARY(name,sex,salary)
VALUES
('A','m',2500),
('B','f',1500),
('C','m',5500),
('D','f',500);