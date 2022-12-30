select film_id from film_acustomersctor where Actor_id = 1 ;
select *
  from film_actor
 where film_id in ( select film_id 
					  from film_actor
					 where Actor_id = 1 ) ;

select * 
  from rental 
 where staff_id = 1
   and customer_id = 130
   and inventory_id = 367;
   
select * 
  from rental 
 where return_date is null ;
 
 select first_name, email
   from customer
  where customer_id in (select customer_id
						  from rental 
						 where return_date is null ) ;

/* 그룹함수(집계함수) */
select payment_date, count(*), sum(amount)
  from payment 
group by payment_date;

select a.first_name, m.title
  from film_actor f, actor a, film m
 where f.actor_id = a.actor_id
   and f.film_id = m.film_id;
 
select count(*)
  from film_actor, actor ;