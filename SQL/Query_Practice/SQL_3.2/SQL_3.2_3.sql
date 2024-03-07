-- Case 3
-- Consider a table called "employees" with the following columns: "id", "name", "department", "salary". 
create table employees(
id int not null primary key auto_increment,
name varchar(30) not null,
department varchar(30) not null,
salary decimal(10,2) not null
);

INSERT INTO employees (name, department, salary) 
VALUES
('John', 'sales', 60000.00),
('Alice', 'sales', 55000.00),
('Bob', 'marketing', 48000.00),
('Emily', 'sales', 52000.00),
('David', 'engineering', 70000.00),
('Jane', 'sales', 48000.00);


-- Write a SQL query to retrieve the names and salaries of all employees in the "sales" department who earn more than $50,000 per year.
select name,salary from employees where salary>50000 and department='sales';