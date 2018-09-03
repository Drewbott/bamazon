DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("UHD TV", "electronics", 1999.99, 10), ("PS4", "electronics", 399.99, 2), ("Nintendo Switch", "electronics", 299.99, 5), ("Squatty Potty", "home", 39.99, 3), ("Paper towels", "home", 14.99, 8),
("Rubber Duck", "misc", 3.00, 10), ("Star Wars poster", "misc", 20.00, 6), ("iPhone X", "electronics", 999.99, 1), ("Galaxy S9", "electronics", 799.99, 5), ("Backpack", "home", 49.99, 7);


SELECT * FROM products