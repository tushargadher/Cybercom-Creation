
-- 9.	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
-- along with the total amount they have spent on all orders and the average amount they have spent per order.
 
	use practice5_1_8;

    SELECT c.customer_name,sum(p.price) as TotalAmount,count(o.customer_id) as TotalOrders,avg(p.price) as Average_Amount_Per_Orders
    FROM customers AS c
    inner JOIN orders AS o ON c.customer_id = o.customer_id
    inner JOIN products as p ON p.product_id= o.product_id
    group by o.customer_id;
     

    
