-- Case 2
-- Consider you’ve one employee database system. Create table schema and add data according to the following queries.

create table employee(
id int not null primary key auto_increment,
firstName varchar(40) not null,
lastName varchar(40) not null,
title varchar(40) not null,
department varchar(40) not null,
salary decimal(10,2)not null,
joinDate date not null,
Dependent int not null
);
drop table employee;

INSERT INTO employee (firstName, lastName, title, department, salary, joinDate,Dependent) 
VALUES
    ('John', 'Doe', 'Manager', 'Sales', 60000.00, '1998-05-15',1),
    ( 'Jane', 'Smith', 'Sales Associate', 'Sales', 50000.00, '1998-10-20',0),
    ( 'Michael', 'Johnson', 'Manager', 'Marketing', 65000.00, '2005-03-12',3),
    ( 'Emily', 'Williams', 'Marketing Coordinator', 'Marketing', 55000.00, '2007-08-25',1),
    ( 'David', 'Brown', 'HR Manager', 'HR', 70000.00, '2000-12-01',2),
    ( 'Sarah', 'Jones', 'HR Assistant', 'HR', 48000.00, '2004-06-18',3),
    ('Alice', 'Johnson', 'Sales Manager', 'Sales', 62000.00, '2022-08-10',0),
    ('Bob', 'Smith', 'Sales Associate', 'Sales', 51000.00, '2022-09-15',0),
    ('Charlie', 'Williams', 'Marketing Coordinator', 'Marketing', 57000.00, '2022-10-20',1),
    ('David', 'Clark', 'Financial Analyst', 'Finance', 68000.00, '2022-11-25',2),
    ('Emma', 'Taylor', 'HR Manager', 'HR', 72000.00, '2022-12-01',4),
    ('Frank', 'Miller', 'Engineer', 'Engineering', 80000.00, '2023-01-05',2),
    ('Grace', 'Davis', 'Accountant', 'Finance', 62000.00, '2023-02-10',0);

-- 1.	Write a query that returns the first and last name of all employees who have a title that contains the word "Manager".

		select firstName,lastName from employee where title like '%Manager%';


-- 2.	Write a query that returns the department name and the average salary of all employees in each department.

        select department,avg(salary) as 'Average Salary' from employee group by department;
        
-- 3.	Write a query that returns the number of employees who were hired in each year, sorted by year.

        select year(joinDate)as Year,count(*) as "Hired Employee" 
        from employee 
        group by Year
        order by Year;
        
-- 4.	Write a query that returns the first name, last name, and salary of the top 10 highest-paid employees.

		select firstName,lastName,salary 
        from employee 
        order by salary desc 
        limit 10;
        
-- 5.	Write a query that updates the salary of all employees in the "Sales" department to be 10% higher than their current salary.
        
        update employee
        set salary = salary + (salary*0.1)
        where department='Sales';
        
-- 6.	Write a query that deletes all employees who were hired before the year 2000.

        delete from employee
        where Year(joinDate)<2000;
        
-- 7.	Write a query that creates a new table called "employee_stats" that contains the following columns: 
        -- "department_name", "total_employees", and "average_salary". The table should include one row for each department.

		create table employee_stats(
        department_name varchar(30) not null,
        total_employee int not null,
        average_salary decimal(10,2) not null
        );
        
        INSERT INTO employee_stats (department_name, total_employee, average_salary) VALUES
		('Sales', 10, 60000.00),
		('Marketing', 8, 65000.00),
		('HR', 6, 55000.00),
		('Finance', 5, 62000.00),
		('Engineering', 7, 70000.00),
		('IT', 9, 62000.00),
		('Administration', 4, 58000.00),
		('Operations', 8, 58000.00),
		('Customer Service', 6, 53000.00),
		('Research and Development', 5, 72000.00);
		
-- 8.	Write a query that returns the first and last name of all employees who have the same last name as their manager.
		
        select e.firstName,e.lastName from employee e
        join employee m on e.lastName=m.lastName
        where m.title='manager';
        
-- 9.	Write a query that returns the top 5 departments with the highest average salary.
		
        select * from employee_stats 
        where average_salary 
        order by average_salary desc 
        limit 5;
        
-- 10.	Write a query that returns the first and last name of all employees who have at least one dependent. Sort the results by last name.
		
        select firstName,lastName from employee where dependent>=1 order by lastName;