-- Case 1
-- Consider the following table structure for a blog:

CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    author_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
CREATE TABLE blog_comments (
    id INT PRIMARY KEY auto_increment,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    Foreign key(post_id) references blog_posts(id)
);
INSERT INTO blog_posts (title, body, author_id, created_at, updated_at)
VALUES
    ('Introduction to SQL', 'SQL is a powerful language for managing and querying databases.', 1, '2024-01-01 11:00:00', '2024-01-01 12:00:00'),
    ('Database Normalization', 'Explore the importance of database normalization and its benefits.', 1, '2024-01-04 13:00:00', '2024-01-04 15:00:00'),
    ('Query Optimization Strategies', 'Discover various strategies for optimizing SQL queries for better performance.', 2, '2024-01-05 15:00:00', '2024-01-05 16:00:00'),
    ('Indexing in Databases', 'Learn about indexing techniques and their impact on database performance.', 3, '2024-01-06 17:00:00', '2024-01-06 18:00:00'),
    ('SQL Injection Prevention', 'Understand the risks of SQL injection attacks and how to prevent them.', 1, '2024-01-07 19:00:00', '2024-01-07 20:00:00'),   
    ('SQL Joins', 'Understand the concept of join in sql', 1, '2024-01-07 20:00:00', '2024-01-07 22:00:00');

INSERT INTO blog_comments (post_id, body, author_id, created_at)
VALUES
    (1, 'nice information!', 2, '2024-01-01 12:00:00'),
    (1, 'Can you provide more detail of SQL.', 3, '2024-01-02 13:00:00'),
    (2, 'What is differnce between MySQL and MongoDB', 1, '2024-01-03 14:00:00'),
    (3, 'Thanks for sharing.', 2, '2024-01-04 15:00:00'),
    (3, 'I found the data modeling basics very helpful for my project.', 1, '2024-01-06 17:00:00'),
    (1, 'This helped me understand SQL better.', 2, '2024-01-07 18:00:00'),
    (2, 'what is database normalization', 2, '2024-01-08 19:00:00'),
    (3, 'why we need to optimise query?', 3, '2024-01-09 20:00:00'),
    (4, 'Indexing make searching faster', 3, '2024-01-10 21:00:00');
-- Write a query to retrieve the title and body of the five most recent blog posts, along with the number of comments each post has.

select blog.title,blog.body,
(select count(*) from blog_comments comments where comments.post_id = blog.id) 
as "Total Comments"
from blog_posts blog
order by blog.created_at desc
limit 5;
