-- Write an SQL query to swap all 'f' and 'm' values (i.e., change all 'f' values to 'm' and vice versa) with a single update statement and no intermediate temporary tables.Note that you must write a single update statement, do not write any select statement for this problem
CREATE TABLE SALARY(
id int auto_increment,
name varchar(20) not null,
sex ENUM('F','M') not null,
salary int not null,
primary key (id)
);

INSERT INTO SALARY(name,sex,salary)
VALUES
('A','m',2500),
('B','f',1500),
('C','m',5500),
('D','f',500);

COMMIT;

select * from salary;

UPDATE SALARY 
SET SEX = CASE
		     WHEN SEX='F'
                THEN 'M'
             ELSE 'F'
          END;

ROLLBACK;          