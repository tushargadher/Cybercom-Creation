use practice5_1_6;


-- 7.	Write a SQL query to retrieve the names and salaries of the five highest paid employees in each department of the "employees" table, 
-- sorted by department ID and then by salary in descending order.

select emp_id,emp_name,emp_salary,dept_name,row_num
from (
		SELECT 
			e.emp_id,
			e.emp_name,
			e.emp_salary,
			d.dept_name,
			ROW_NUMBER() OVER (PARTITION BY d.dept_id ORDER BY emp_salary DESC) AS row_num
		FROM employees as e
		inner join departments as d on e.dept_id = d.dept_id
) as renked_row
where row_num<=5;




