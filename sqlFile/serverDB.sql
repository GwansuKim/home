insert into customers(name, email, phone, address) /*id는 자동생성->생략가능*/
/*values('John Doe', 'john@mail.com', '010-0000-0000', '');*/
values('a', 'a@mail.com','010-0000-0001', '');
insert into customers(name, email, phone, address)
values('kang', 'kang@mail.com','010-0000-0005', '');

select * from customers;
select * from customers where id=1;
SELECT LAST_INSERT_ID();

update customers set name = '김유신' where id = 2;
update customers set email = 'Usin@mail.com' where id = 2;

delete from customers where id = 2;

create user 'dev01'@'%' identified with mysql_native_password by '1234';
grant all privileges on dev.* to 'dev01'@'%' with grant option;
flush privileges;