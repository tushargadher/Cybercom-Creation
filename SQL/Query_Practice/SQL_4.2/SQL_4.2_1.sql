-- Case 1
-- Assume you are working with a company that has a database containing information about employees and their departments. The database has three tables:

create database EmployeeDatabase;
use EmployeeDatabase;
-- Employees table, which includes columns for employee ID, name, department ID, and salary.
-- Departments table, which includes columns for department ID and department name.
-- Salaries table, which includes columns for employee ID, salary, and date.


create table Employees (
id int not null auto_increment primary key,
name varchar(30),
department_id int not null,
salary decimal(10,2),
foreign key(department_id) references Departments(id)
);

create table Departments(
id int not null primary key auto_increment,
department_name varchar(30)
);

create table Salaries(
employee_id int not null,
salary decimal(10,2) not null,
Date date not null,
foreign key(employee_id) references Employees(id)
);

INSERT INTO Departments (department_name) VALUES
('Human Resources'),
('Marketing'),
('Sales');

INSERT INTO Employees (name, department_id, salary) VALUES
('John Doe', 1, 50000.00),
('Jane Smith', 2, 60000.00),
('David Johnson', 1, 55000.00),
('Emily Brown', 3, 62000.00);

INSERT INTO Salaries (employee_id, salary, Date) VALUES
(1, 52000.00, '2024-02-11'),
(2, 66000.00, '2024-02-11'),
(3, 58000.00, '2024-02-11'),
(4, 69000.00, '2024-02-11'),
(1, 54000.00, '2024-03-11'),
(2, 69000.00, '2024-03-11'),
(3, 60000.00, '2024-03-11'),
(4, 70000.00, '2024-03-11');




-- 1.	Write a query to return the names of all employees who work in the 'Sales' department.

		select name,d.department_name as DepartmentName 
        from Employees as emp
		inner join departments as d
		on d.id = emp.department_id
		having DepartmentName ='Sales';

-- 2.	Write a query to return the total number of employees in each department, ordered by department name.

        select d.department_name as DepartmentName,count(emp.department_id) as TotalEmployee
        from departments as d 
        inner join employees as emp
		on d.id = emp.department_id
        group by emp.department_id
        order by d.department_name;
        

-- 3.	Write a query to return the average salary for each department, ordered by department name.

		select d.department_name ,avg(e.salary)  
		from departments as d
		inner join employees as e
		on e.department_id = d.id
		group by d.department_name;

-- 4.	Write a query to return the top 10% of highest paid employees, ordered by salary.

		SELECT employee_id, salary, salarayPercentile
		FROM (
			SELECT employee_id, salary, 
				   NTILE(10) OVER (ORDER BY salary DESC) AS salarayPercentile 
			FROM salaries
		) AS percentile_query
		WHERE salarayPercentile = 1;

-- 5.	Write a query to return the salary of each employee for their latest salary entry.

		select e.name ,s.salary
        from employees as e
        inner join salaries as s
        on e.id = s.employee_id
        where s.date =(select MAX(s.date) from salaries as s);
        

