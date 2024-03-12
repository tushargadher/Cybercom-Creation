-- Case 1
-- Assume you are working on a database for a car dealership. The database contains the following tables:
CREATE TABLE cars (
    CarID INT PRIMARY KEY AUTO_INCREMENT,
    Brand VARCHAR(50),
    Model VARCHAR(50),
    Year INT,
    Mileage INT,
    Price DECIMAL(10,2),
    Available BIT
);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PhoneNumber VARCHAR(20)
);


CREATE TABLE Sales (
    SaleID INT PRIMARY KEY AUTO_INCREMENT,
    CarID INT,
    CustomerID INT,
    SaleDate DATE,
    SalePrice DECIMAL(10,2),
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO cars (Brand, Model, Year, Mileage, Price, Available) VALUES
    ('Toyota', 'Corolla', 2018, 30000, 15000.00, 1),
    ('Honda', 'Civic', 2019, 25000, 16000.00, 1),
    ('Ford', 'Focus', 2017, 35000, 14000.00, 0),
    ('Chevrolet', 'Malibu', 2016, 40000, 13000.00, 1),
    ('Nissan', 'Altima', 2019, 20000, 17000.00, 1),
    ('BMW', '3 Series', 2020, 15000, 30000.00, 1),
    ('Mercedes-Benz', 'C-Class', 2018, 25000, 35000.00, 0),
    ('Audi', 'A4', 2019, 20000, 32000.00, 1),
    ('Hyundai', 'Elantra', 2017, 30000, 12000.00, 1),
    ('Kia', 'Optima', 2018, 28000, 14000.00, 1),
    ('Volkswagen', 'Jetta', 2019, 22000, 16000.00, 1),
    ('Subaru', 'Impreza', 2016, 38000, 15000.00, 0),
    ('Mazda', 'Mazda3', 2020, 10000, 18000.00, 1),
    ('Tesla', 'Model 3', 2021, 5000, 40000.00, 1);

INSERT INTO Customers (FirstName, LastName, Email, PhoneNumber) VALUES
    ('Alice', 'Smith', 'alice@gamil.com', '111-222-3333'),
    ('Bob', 'Johnson', 'bob@gmail.com', '444-555-6666'),
    ('Charlie', 'Brown', 'charlie@gmail.com', '777-888-9999'),
    ('David', 'Lee', 'david@gmail.com', '111-222-3333'),
    ('Emma', 'Garcia', 'emma@gmail.com', '444-555-6666'),
    ('Den', 'Core', 'den@gamil.com', '134-222-3333');


INSERT INTO Sales (CarID, CustomerID, SaleDate, SalePrice) VALUES
    (1, 1, '2024-03-07', 15000.00),
    (2, 2, '2024-03-08', 16000.00),
    (3, 3, '2024-03-09', 14000.00),
    (4, 4, '2024-03-10', 13000.00),
    (5, 5, '2024-03-11', 17000.00),   
    (12, 3, '2024-03-11', 19000.00);


-- 1.	Retrieve the top 10 most expensive cars from the Cars table.

    select * from cars order by price desc limit 10;
    
-- 2.	Retrieve the average price of all available cars from the Cars table.

    select avg(price) as 'Average Price' from cars where Available = 1;
    
-- 3.	Retrieve the list of customers who have purchased a car, along with the total number of cars each customer has purchased.

       select c.CustomerID,c.FirstName,c.LastName,c.Email,c.PhoneNumber,COUNT(s.CarID) carPurchased from customers c
       inner join sales s
       on c.CustomerID = s.CustomerID
       group by c.CustomerID,c.FirstName,c.LastName,c.Email,c.PhoneNumber;

-- 4.	Retrieve the list of customers who have not yet made a purchase.

		select c.CustomerID,c.FirstName,c.LastName,c.Email,c.PhoneNumber,s.CustomerID
		from customers c 
		left join sales s
		on  c.CustomerID = s.CustomerID
		where s.CustomerID is null;

-- 5.	Insert a new car into the Cars table with the following information: Brand='Toyota', Model='Corolla', Year=2022, Mileage=0, Price=20000, Available=1.
         
		INSERT INTO cars (Brand, Model, Year, Mileage, Price, Available) 
        VALUES
        ('Toyota', 'Corolla', 2022, 0, 2000.00, 1);

-- 6.	Update the price of all cars in the Cars table by adding 10% to their current price.

        update cars
        set price = price + (price * 0.10);

-- 7.	Delete all sales from the Sales table that occurred before January 1, 2022.

        delete from sales 
        where SaleDate < '2022-01-01';