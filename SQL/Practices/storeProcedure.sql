-- Create the stored procedure
DELIMITER //

CREATE PROCEDURE ManageEmployees (
    IN operation VARCHAR(10),
    IN emp_id INT,
    IN emp_name VARCHAR(30),
    IN dept_id INT,
    IN emp_salary DECIMAL(10,2)
)
BEGIN
    DECLARE emp_count INT;

    IF operation = 'CREATE' THEN
        INSERT INTO Employees (name, department_id, salary)
        VALUES (emp_name, dept_id, emp_salary);
    END IF;

    IF operation = 'SELECT' THEN
        SELECT * FROM Employees;
    END IF;

    IF operation = 'UPDATE' THEN
        UPDATE Employees
        SET name = emp_name, department_id = dept_id, salary = emp_salary
        WHERE id = emp_id;
    END IF;

    IF operation = 'DELETE' THEN
        DELETE FROM Employees WHERE id = emp_id;
    END IF;
END; 

DELIMITER ;

CALL ManageEmployees('CREATE', NULL, 'John Doe', 1, 50000.00);

CALL ManageEmployees('SELECT', NULL, NULL, NULL, NULL);

CALL ManageEmployees('UPDATE', 1, 'John Doe', 2, 55000.00);

CALL ManageEmployees('DELETE', 1, NULL, NULL, NULL);


-- in parameter used to pass value to stored procedure
-- out used to return value from the stored procedure