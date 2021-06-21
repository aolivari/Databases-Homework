select * from customers ; 
select * from hotels ; 
select * from bookings ; 
SELECT * FROM hotels WHERE rooms > 7;
SELECT name,address FROM customers WHERE id = 3;
SELECT * FROM bookings WHERE checkin_date > '2019/10/01';
SELECT * FROM bookings WHERE checkin_date > '2019/10/01' AND nights >= 2;

SELECT * FROM hotels WHERE postcode = 'CM194JS' OR postcode = 'TR209AX';

SELECT * FROM hotels WHERE postcode in('CM194JS','TR209AX');

select * from customers ; 
select * from customers WHERE NAME  = 'Laurence Lebihan' ;
select NAME from customers WHERE country  = 'UK' ;
select address, CITY, POSTCODE from customers WHERE NAME  = 'Melinda Marsh' ;
select * from hotels where postcode = 'DGQ127';
select * from hotels where rooms >11;
select * from hotels where rooms >6 and rooms <15;
select * from hotels where rooms =10 or rooms =20;
select * from bookings where customer_id = 1;
select * from bookings where nights >4;
select * from bookings where checkin_date > '2019/12/31';

select * from bookings where checkin_date between '2020/01/01' and '2020/12/01' ;

select * from bookings where checkin_date > '2019/12/31' and nights <=4;













