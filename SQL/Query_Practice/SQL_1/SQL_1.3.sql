
-- Create a database structure for worldwide cricket team. Database will contain, each player’s name, its country, it’s expertise and so on. 

CREATE TABLE PLAYERS(
ID INT NOT NULL AUTO_INCREMENT,
PLAYER_NAME VARCHAR(30) NOT NULL,
COUNTRY VARCHAR(30) NOT NULL,
EXPERTISE VARCHAR(30) NOT NULL,
DOB DATE NOT NULL,
PLAYERS_ROLE VARCHAR(30),
CONSTRAINT CHECK_ROLE CHECK(PLAYERS_ROLE IN("BATSMEN","BOWLER","ALL-ROUNDER","WICKET-KEEPER")),
PRIMARY KEY (ID)
);