select current_date();
select curdate();
select sysdate();
select now();
select date("2024-10-15 09:34:32") as OnlyDate;
select month("2024-10-15 09:34:32") as month;
select monthname("2024-10-15 09:34:32") as monthName;
select Year("2024-10-15 09:34:32") as Year;
select quarter("2024-01-15 09:34:32") as Quarter;
select day("2024-01-15 09:34:32") as day;
select dayofmonth("2024-01-15 09:34:32") as dayofmonth;
select dayname("2024-01-15 09:34:32") as dayname;
select dayofweek("2024-01-15 09:34:32") as dayofweek;
select dayofyear("2024-04-15 09:34:32") as dayofyear;
select week("2024-01-15 09:34:32") as week;
select weekday("2024-01-14 09:34:32") as weekday;
select yearweek("2024-01-15 09:34:32") as yearweek;
select last_day("2024-04-15 09:34:32") as last_day;
select extract(YEAR FROM "2024-04-15 09:34:32") as YEAR;
select extract(second FROM "2024-04-15 09:34:32") as SECOND;

-- ------------------------------------------------------------

select adddate("2024-03-11", interval 10 minute);