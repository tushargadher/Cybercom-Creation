-- CASE 1
create database practice2;
use practice2;
CREATE TABLE Activity(
player_id int not null,
device_id int not null,
event_date date not null,
games_played int not null,
primary key(player_id,event_date)
-- this is called composite primary key
);

insert into Activity(player_id,device_id,event_date,games_played)
values
(1,2,'2016-03-01',5),
(1,2,'2016-05-02',6),
(1,3,'2017-06-25',1),
(3,1,'2016-03-02',0),
(3,4,'2018-07-03',5);


-- Question 1: Write an SQL query to report the first login date for each player. Return the result table in any order

select player_id,MIN(event_date) as First_login from activity group by player_id;

-- Question 2: Write an SQL query to report the device that is first logged in for each player. Return the result table in any order.

select player_id,min(device_id) as device_id from activity group by player_id;

-- Question 3: Write an SQL query to report for each player and date, how many games played so far by the player. That is, the total number of games played by the player until that date. Check the example for clarity. Return the result table in any order.
select a1.player_id,a1.event_date,
(
select sum(a2.games_played) from activity a2 
where a2.player_id = a1.player_id and a2.event_date <= a1.event_date
)as games_played_so_far 
from activity a1;
