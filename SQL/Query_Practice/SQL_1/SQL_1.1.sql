
-- Create a database structure for product and categories. One product can be in more than one category and one category can have multiple products.
CREATE TABLE PRODUCT(
ID INT AUTO_INCREMENT,
PRODUCT_NAME VARCHAR(40) NOT NULL,
PRODUCT_DESCRIPTION TEXT NOT NULL,
PRICE DECIMAL(10,2) NOT NULL,
STOCK DECIMAL(10) NOT NULL,
CATEGORY_ID INT NOT NULL,
PRIMARY KEY(ID),
FOREIGN KEY(CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);

CREATE TABLE CATEGORY(
CATEGORY_ID INT AUTO_INCREMENT,
CATEGORY_NAME VARCHAR(20),
PRIMARY KEY(CATEGORY_ID)
);

-- i think we should remove primary key in product table then it will stisfiy one product can be in more then one category