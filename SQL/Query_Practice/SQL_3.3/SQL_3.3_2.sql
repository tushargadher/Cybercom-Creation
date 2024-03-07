-- Case 2
-- Create a table called "employees" with the following columns: "id" (integer, primary key), "name" (text), "age" (integer), and "salary" (integer).
-- Insert the following data into the "employees" table:
create database practice3_3;
use practice3_3;
create table employees(
id int not null auto_increment primary key,
name text(30) not null,
age int not null,
salary int not null
);

insert into employees(name,age,salary)
values
('John',35,60000),
('Mary',27,50000),
('Peter',42,75000),   -- later age is updated to 43
('Olivia',29,55000),
('Michael',38,80000);


-- 1.	Write a SQL query to select all employees from the "employees" table.

        select * from employees;  
        
-- 2.	Write a SQL query to select the name and salary of all employees with a salary greater than 60000.

        select name,salary from employees where salary > 60000;

-- 3.	Write a SQL query to update Peter's age to 43.

        update employees
        set age = 43
        where name='Peter';
	
-- 4.	Write a SQL query to delete the employee with the id of 4.

        delete from employees
        where id = 4;
        
-- 5.	Write a SQL query to calculate the average salary of all employees.
   
		select avg(salary) as "Average Salary" from employees;
        
-- 6.	Write a SQL query to select the name and age of the oldest employee.

        select name,age
        from employees
        where age = (select max(age) from employees);
        
-- 7.	Write a SQL query to select the name and age of the youngest employee.

        select name,age 
        from employees
		where age = (select min(age) from employees);
        
-- 8.	Write a SQL query to select the name of the employee with the highest salary.

        select name 
        from employees
        where salary = (select max(salary) from employees)
        limit 1;