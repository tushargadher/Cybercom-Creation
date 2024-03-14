 
create database practice5_1_6;
use practice5_1_6;

CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    emp_salary DECIMAL(10, 2) NOT NULL,
    dept_id INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

INSERT INTO departments (dept_name) VALUES
('HR'),
('Finance'),
('IT');

INSERT INTO employees (emp_name, emp_salary, dept_id) VALUES
('John Doe', 50000.00, 1),
('Alice Smith', 60000.00, 1),
('Bob Johnson', 55000.00, 2),
('Charlie Brown', 52000.00, 2),
('Emma White', 70000.00, 3),
('Michael Green', 65000.00, 3),
('Sarah Black', 62000.00, 1),
('David Lee', 53000.00, 2),
('Jessica Taylor', 68000.00, 3),
('Ryan Davis', 54000.00, 1),
('Emily Martinez', 61000.00, 2),
('James Wilson', 67000.00, 3),
('Jennifer Anderson', 58000.00, 1),
('Matthew Harris', 56000.00, 2),
('Nicole Clark', 69000.00, 3);

-- 6.	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the
-- minimum salary of their department in the "employees" table, sorted by department ID and then by salary in descending order.

		select e.emp_name,e.emp_salary,d.dept_name 
        from employees as e
        inner join departments as d
        on e.dept_id = d.dept_id
        where e.emp_salary > (select min(emp_salary) from employees where dept_id = d.dept_id);
        
        
        
        -- to find minimum salary of each department
        select d.dept_name,min(emp_salary) as minimumSalary
        from employees as e
        inner join departments as d
        where e.dept_id = d.dept_id
        group by d.dept_id;
	
        
        


