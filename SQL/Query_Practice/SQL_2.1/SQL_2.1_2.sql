-- Write an SQL query to report the movies with an odd-numbered ID and a description that is not "boring". Return the result table ordered by rating in descending order.
CREATE TABLE CINEMA(
id int not null,
movie varchar(20),
description varchar(30),
rating float(10,1),
primary key(id)
);

INSERT INTO CINEMA(id,movie,description,rating)
VALUES
(1,"War","great 3D",8.9),
(2,"Science","fiction",8.5),
(3,"irish","boring",6.2),
(4,"Ice song","Fantacy",8.6),
(5,"House card","Interesting",9.1);

SELECT * FROM CINEMA WHERE (MOD(id,2)<>0) AND description !="boring" ORDER BY rating DESC;