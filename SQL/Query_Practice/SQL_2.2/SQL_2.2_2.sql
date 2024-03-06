-- CASE 2
-- Write an SQL query to report all the classes that have at least five students. Return the result table in any order.
use practice2;
create table courses(
student varchar(20) not null,
class varchar(20) not null,
primary key(student,class)
);
insert into courses(student,class)
values
('A','Math'),('B','English'),('C','Math'),('D','Biology'),('E','Math'),('F','Computer'),('G','Math'),('H','Math'),('I','Math');

select class from courses group by class having COUNT(class)>=5;