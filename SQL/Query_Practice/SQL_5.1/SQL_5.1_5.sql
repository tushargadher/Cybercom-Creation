
-- 5.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, but have not made any orders in the last 90 days.
use practice5_1_1;

SELECT c.name
FROM customers AS c
WHERE c.id NOT IN (
    SELECT o.customer_id
    FROM orders AS o
    WHERE DATEDIFF(CURRENT_DATE(), o.order_date) < 90
)

