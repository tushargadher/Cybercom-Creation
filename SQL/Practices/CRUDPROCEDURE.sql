use yonobank;

delimiter //

create procedure EmployeeCRUD(
in operation varchar(20),
in id int,
in name varchar(20),
in department varchar(20),
in salary decimal(10,2)
)
begin
		

        if operation = 'insert' then
           insert into employees(emp_name,emp_department,emp_salary)
           values(name,department,salary);
		end if;

        if operation = 'select' then
           select * from employees;
		end if;
        
        if operation = 'selectEmployee' then
           select 'Hello';
           select * from employees where emp_id = id;
		end if;
        
        
        if operation = 'update' then
            if name is not null then  
                update employees set emp_name = name where emp_id = id;
			end if;
            if department is not null then
                update employees set emp_department = department where emp_id = id;
			end if;
            if salary is not null then
                update employees set emp_salary = salary where emp_id = id;
			end if;
		end if;

        if operation = 'delete' then
           delete from employees where emp_id = id;
		end if;
end //
delimiter ;



call EmployeeCRUD('insert',NULL,'Tushar','FULL STACK',25500.00);
call EmployeeCRUD('insert',NULL,'Manish','FULL STACK',20500.00);
call EmployeeCRUD('insert',NULL,'Rocky','FULL STACK',24500.00);


call EmployeeCRUD('select',NULL,NULL,NULL,NULL);

CALL EmployeeCRUD('selectEmployee',1, NULL,NULL,NULL);
		

call EmployeeCRUD('UPDATE',4,'Bharat',NULL,NULL);

call EmployeeCRUD('delete',3,NULL,NULL,NULL);



drop procedure EmployeeCRUD;
show procedure status;