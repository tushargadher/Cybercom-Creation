-- Write an SQL query to create index on the email column.
CREATE TABLE EMAILS(
ID INT NOT NULL auto_increment,
EMAIL VARCHAR(30),
PRIMARY KEY(ID)
);

CREATE INDEX UserEmail ON EMAILS(EMAIL);

SHOW INDEX FROM EMAILS;

DROP INDEX UserEmail ON EMAILS;