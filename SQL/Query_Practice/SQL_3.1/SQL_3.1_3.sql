-- Case 3
-- Write a query to retrieve the total sales for each month in the year 2021, sorted in ascending order by month.

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

INSERT INTO sales (date, customer_id, product_id, quantity, total_price) VALUES
('2021-01-15', 1, 101, 2, 50.00),
('2021-01-20', 2, 102, 1, 25.00),
('2021-02-05', 3, 101, 3, 75.00),
('2021-02-10', 1, 103, 2, 60.00),
('2021-03-15', 2, 102, 4, 100.00),
('2021-03-20', 3, 101, 1, 25.00),
('2021-04-10', 1, 102, 3, 75.00),
('2021-04-25', 2, 103, 2, 60.00),
('2022-04-05', 3, 101, 4, 100.00),
('2022-05-20', 1, 102, 1, 25.00);

select MONTH(date) as Months ,sum(total_price) as "Total Sales" from sales where YEAR(date)=2021 group by MONTH(date) order by Months;