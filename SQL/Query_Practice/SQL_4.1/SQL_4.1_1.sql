-- Case 1
-- Assume that you are working with a database containing information about a bookstore. The database has several tables:
-- books table containing information about all books in the bookstore. The table has the following columns:
	create database bookstore;
	use bookstore;
    
	create table books(
	id int not null primary key auto_increment,
	title text not null,
	author_id int not null,
	publication_date date not null,
	foreign key(author_id) references author(id)
	);

    create table author(
    id int not null primary key auto_increment,
    name varchar(30) not null
    );
    

   create table book_categories(
   id int not null primary key auto_increment,
   name varchar(30) not null
   );
   
   create table book_category_mappings(
   id int not null primary key auto_increment,
   book_id int not null,
   category_id int not null,
   foreign key(book_id) references books(id),
   foreign key(category_id) references book_categories(id)
   );
   
INSERT INTO books (title, author_id, publication_date) VALUES 
('Harry Potter and the Chamber of Secrets', 1, '1998-07-02'),
('Harry Potter and the Prisoner of Azkaban', 1, '1999-07-08'),
('Harry Potter and the Goblet of Fire', 1, '2000-07-08'),
('The Stand', 2, '1978-10-03'),
('It', 2, '1986-09-15'),
('And Then There Were None', 3, '1939-11-06'), 
('IT Return ', 3, '2020-10-06'),
('To Kill a Mockingbird', 2, '1960-07-11'),
('1984', 3, '1949-06-08'),
('Pride and Prejudice', 1, '1813-01-28'),
('The Great Gatsby', 3, '1925-04-10'),
('The Catcher in the Rye', 2, '1951-07-16');


INSERT INTO author (name) VALUES 
('J.K. Rowling'),
('Stephen King'), 
('Agatha Christie');
INSERT INTO book_categories (name) VALUES
('Fantasy'), 
('Horror'), 
('Mystery'),
('Fiction');


INSERT INTO book_category_mappings (book_id, category_id) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 3),
(5, 2),
(6, 4),
(7, 2),
(8, 4),
(9, 2),
(10, 4),
(11, 3),
(12, 4);


-- 1.	Write a query to find all books published in the year 2020.

		select * from books 
        where YEAR(publication_date) = 2020;
        
-- 2.	Write a query to find the name of the author who has written the most number of books.

		select a.name,count(b.author_id) as TotalBooks
        from author as a
        inner join books as b
        on a.id = b.author_id
        group by b.author_id;
        
-- 3.	Write a query to find the name of the category with the most number of books.

		select bc.name ,count(bcm.category_id) as TotalBooks
        from book_categories as bc
        inner join book_category_mappings as bcm
        on bc.id = bcm.category_id
        group by bcm.category_id
        order by TotalBooks desc
        limit 1;
        
-- 4.	Write a query to find the name of the author who has written the most number of books in the category "fiction".

		select a.name,bc.name,count(b.author_id) as totalbook from author as a
        left join books as b
        on b.author_id = a.id
        inner join book_categories as bc
        where bc.name ='fiction'
        group by a.id;
        
        --
        
        
-- 5.	Write a query to find the titles of the top 5 most popular books. The popularity of a book is defined as the number of times it has been borrowed by customers. Assume that information about book borrowings is stored in a separate table called book_borrowings with the following columns:

create table book_borrowings(
id int not null primary key auto_increment,
book_id int not null,
customer_id int not null,
borrow_date date not null,
foreign key (book_id) references books(id)
);
INSERT INTO book_borrowings (book_id, customer_id, borrow_date) VALUES
(1, 101, '2024-03-01'),
(2, 102, '2024-03-02'),
(3, 103, '2024-03-03'),
(3, 104, '2024-03-04'),
(5, 105, '2024-03-05'),
(1, 106, '2024-03-06'),
(2, 107, '2024-03-07'),
(3, 108, '2024-03-08'),
(3, 109, '2024-03-09'),
(5, 110, '2024-03-10'),
(2, 111, '2024-03-11'),
(3, 112, '2024-03-12'),
(4, 113, '2024-03-13'),
(12, 114, '2024-03-14'),
(12, 115, '2024-03-15');

select b.title,count(bw.book_id) as TotalBorrowing from books as b
inner join book_borrowings as bw
on b.id = bw.book_id
group by bw.book_id
order by TotalBorrowing desc
limit 5;
