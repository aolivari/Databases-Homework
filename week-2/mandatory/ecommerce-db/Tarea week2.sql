--1. Retrieve all the customers names and addresses who lives in United States

select "name" , address  from customers where country = 'United States';

--2. Retrieve all the customers ordered by ascending name

select * from customers c order by "name" ;

--3. Retrieve all the products which cost more than 100

select * from products p where unit_price > 100;

--4. Retrieve all the products whose name contains the word `socks`

select * from products p where  product_name like '%socks%';

--5. Retrieve the 5 most expensive products

select * from products p order by  unit_price desc limit 5;

--6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

select p.product_name , p.unit_price , s.supplier_name from products p 
join suppliers s on p.supplier_id = s.id ;

--7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.


select p.product_name , s.supplier_name from products p
join suppliers s on p.supplier_id = s.id 
where s.country = 'United Kingdom';


--8. Retrieve all orders from customer ID `1`;
select * from orders o 
where o.customer_id =1;

--9. Retrieve all orders from customer named `Hope Crosby`;

select * from orders o 
join customers c ON o.customer_id = customer_id 
where c."name" = 'Hope Crosby';

--10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`;

select p.product_name , p.unit_price , oi.quantity from orders o
join order_items oi on o.id = oi.order_id join products p  on p.id = oi.order_id 
where order_reference = 'ORD006';

-- 11. Retrieve all the products with their supplier for all orders of all customers. 
--The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.

select c."name" ,o.order_reference , o.order_date , p.product_name , s.supplier_name , oi.quantity from products p 
join suppliers s on s.id = p.supplier_id  join order_items oi on oi.product_id = p.id join orders o on o.id = oi.order_id join customers c on c.id = o.customer_id ;


--12. Retrieve the names of all customers who bought a product from a supplier from China;

select c."name" from products p 
join suppliers s on s.id = p.supplier_id  join order_items oi on oi.product_id = p.id join orders o on o.id = oi.order_id join customers c on c.id = o.customer_id 
where s.country = 'China';







