-- Case 1
-- Consider a table called "books" with the following columns: "id", "title", "author", "publication_year". 
-- Write a SQL query to retrieve the title and author of the oldest book in the table.
create table books(
id int not null auto_increment primary key,
title varchar(30) not null,
author varchar(30) not null,
publication_year date 
);

INSERT INTO books (title, author, publication_year) VALUES
    ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16'),
    ('To the Lighthouse', 'Virginia Woolf', '1927-05-05'),
    ('Moby-Dick', 'Herman Melville', '1851-10-18'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', '1954-07-29'),
    ('Crime and Punishment', 'Fyodor Dostoevsky', '1866-11-14'),
    ('One Hundred Years of Solitude', 'Gabriel García Márquez', '1967-05-30'),
    ('The Odyssey', 'Homer', NULL),
    ('Hamlet', 'William Shakespeare', '1600-01-01'),
    ('The Brothers Karamazov', 'Fyodor Dostoevsky', '1880-11-26'),
    ('Brave New World', 'Aldous Huxley', '1932-10-27');
select * from books
where publication_year=(select MIN(publication_year) from books);
