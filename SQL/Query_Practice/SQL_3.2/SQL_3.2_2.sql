-- Case 2
-- Consider the following table structure for a social media platform:
CREATE TABLE users (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(255),
    created_at TIMESTAMP
);
CREATE TABLE posts (
    id INT PRIMARY KEY auto_increment,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP,
    foreign key (user_id) references users(id)
);
CREATE TABLE likes (
    id INT PRIMARY KEY auto_increment,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP,
    foreign key(user_id) references users(id),
    foreign key(post_id) references posts(id)
);
INSERT INTO users (name, created_at) VALUES
('John Doe', '2023-01-06 17:00:00'),
('Jane Smith', '2022-01-06 17:00:00'),
('Alice Johnson', '2022-01-06 17:00:00'),
('Mark Den', '2023-01-06 17:00:00'),
('Kevin Duno', '2021-01-06 17:00:00');

INSERT INTO posts (user_id, body, created_at) VALUES
(1, 'Hello, World!', '2023-04-06 17:00:00'),
(2, 'This is my first post.', '2022-03-06 11:00:00'),
(3, 'SQL is awesome!', '2022-11-06 17:00:00'),
(1, 'I love SQL queries!', '2023-06-06 11:00:00'),
(2, 'Database design is fun.', '2023-01-06 18:00:00'),
(4, 'My First Post', '2023-01-06 18:00:00'),
(4, 'Did you know mongodb', '2023-02-06 17:00:00');

INSERT INTO likes (user_id, post_id, created_at) VALUES
(1, 1, '2024-01-08 14:00:00'),
(2, 1, '2024-01-08 11:00:00'),
(3, 2, '2024-02-08 19:00:00'),
(1, 3, NOW()),
(3, 3, '2024-01-08 19:00:00'),
(2, 4, '2024-04-08 14:00:00'),
(1, 4, '2023-06-08 12:00:00'),
(5, 7, NOW()),
(4, 6, NOW());


-- Write a query to retrieve the name and number of posts for each user who joined the platform in the year 2022, along with the total number of likes received for each user's posts.

select u.name as name,
(select count(p.user_id) from posts p where p.user_id = u.id) as "Total Post" ,
(select count(l.user_id) from likes l where l.user_id = u.id) as "Total Likes"
from users u 
where Year(u.created_at) = 2022;