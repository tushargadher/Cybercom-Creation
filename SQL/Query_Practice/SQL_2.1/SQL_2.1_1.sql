-- Create a database structure for employee leave application. It should include all the employee's information as well as their leave information.
CREATE TABLE Employee(
Id INT NOT NULL AUTO_INCREMENT,
EmployeeName VARCHAR(20) NOT NULL,
Email VARCHAR(30) NOT NULL UNIQUE,
Department VARCHAR(30) NOT NULL,
PRIMARY KEY(Id)
);

CREATE TABLE LeaveApplication(
Id INT NOT NULL AUTO_INCREMENT,
EmployeeID INT NOT NULL,
StartDate DATE NOT NULL,
EndDate DATE NOT NULL,
Reason TEXT NOT NULL,
PRIMARY KEY (ID),
FOREIGN KEY(EmployeeID) REFERENCES Employee(Id)
);