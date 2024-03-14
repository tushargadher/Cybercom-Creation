
use practice5_1_3;

create table employees(
id int not null auto_increment primary key,
name varchar(30) not null,
salary decimal(10,2) not null
);

INSERT INTO employees (name, salary) VALUES
('John Doe', 50000.00),
('Jane Smith', 60000.00),
('Alice Johnson', 55000.00),
('Bob Brown', 58000.00),
('Emily Wilson', 62000.00),
('Michael Lee', 53000.00),
('Sarah Taylor', 57000.00);

-- 4.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the average salary of all employees in the "employees" table, sorted by salary in descending order.

select name,salary 
from employees
where salary > (select avg(salary) from employees)
order by salary desc;

