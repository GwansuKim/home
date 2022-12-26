create table test2(
id int not null primary key,
col1 int null,
col2 float null,
col3 varchar(45)
);
drop table member;
/*-번호, 이름, 전화번호, 가입일자, 나이 */
create table member (
	no int not null primary key,
	name varchar(10) not null,
    tel varchar(15) null,
	jdt date null,
    age int null
);
/* 이순신, '010-111-222 */
insert into member ( no, name, tel) values (101, '이순신', '010-111-222');
insert into member ( no, name ) values (100, '장영실');
update member set tel='010-333-4444' where no = 101 ;
delete from member where no = 100;

select *
from member;

/* 게시판 글번호, 작성자, 제목, 내용, 작성일자, 조회수 */
create table board(
	no int not null primary key,
	writer varchar(10) not null,
    title varchar(20) not null,
    cont varchar(200) not null,
    Doi date not null,
    views int null
);
insert into board ( no, writer, title, cont, Doi, views ) values ( 1, '1빠', '1등', '11', '2022-12-23', 0 );
update board set cont='일빠당ㅎㅎ' where no=1;

select *
from board;