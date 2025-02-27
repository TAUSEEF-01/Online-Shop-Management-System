select * from product;


DELETE FROM product;


ALTER SEQUENCE product_prod_id_seq RESTART WITH 1;


UPDATE product
SET prod_image = 'https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=';



UPDATE users
SET is_admin = true
WHERE user_id = 1;




select * from orders;

-- ALTER TABLE orders
-- ALTER COLUMN total_amt TYPE DECIMAL(10, 2) USING total_amt::DECIMAL(10, 2);





-- select * from order_detail;

-- select * from bill_detail;


-- select * from orders;


-- DELETE FROM bill_detail;
-- ALTER SEQUENCE bill_detail_bill_id_seq RESTART WITH 1;

-- DELETE FROM order_detail;
-- DELETE FROM orders;
-- ALTER SEQUENCE orders_order_id_seq RESTART WITH 1;

-- select * from bill_detail;

-- ALTER TABLE bill_detail DROP CONSTRAINT bill_detail_order_id_prod_id_fkey;

-- ALTER TABLE bill_detail
-- ADD CONSTRAINT bill_detail_order_id_fkey
-- FOREIGN KEY (order_id) REFERENCES orders(order_id);



-- DROP TABLE IF EXISTS bill_detail CASCADE;


-- CREATE TABLE IF NOT EXISTS bill_detail (
--     bill_id SERIAL PRIMARY KEY,
--     bill_date DATE NOT NULL,
--     user_id INT REFERENCES users(user_id) NOT NULL,
--     order_id INT NOT NULL,
--     user_name VARCHAR(20) NOT NULL,
--     prod_id INT NOT NULL,
--     prod_qty INT NOT NULL,
--     prod_price DOUBLE PRECISION NOT NULL,
--     prod_total_price DOUBLE PRECISION NOT NULL,
--     order_total_price DOUBLE PRECISION NOT NULL,
--     bill_total_price DOUBLE PRECISION NOT NULL,
--     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL,
--     FOREIGN KEY (order_id) REFERENCES orders(order_id)
-- );


-- select * from payment;



-- CREATE TABLE IF NOT EXISTS bill_detail (
--     bill_id SERIAL PRIMARY KEY, -- Automatically incrementing bill ID
--     bill_date DATE NOT NULL, -- Date of the bill (set to current date)
--     user_id INT REFERENCES users(user_id) NOT NULL, -- Foreign key to users table
--     order_id INT REFERENCES orders(order_id) NOT NULL, -- Foreign key to orders table
--     user_name VARCHAR(100) NOT NULL, -- Name of the user
--     order_total_price DECIMAL(10, 2) NOT NULL, -- Total price of the order
--     bill_total_price DECIMAL(10, 2) NOT NULL, -- Total price of the bill (after any adjustments)
--     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL -- Payment status of the bill
-- );



-- CREATE TABLE IF NOT EXISTS bill_product (
--     bill_product_id SERIAL PRIMARY KEY, -- Auto-incrementing ID for the product in the bill
--     bill_id INT REFERENCES bill_detail(bill_id) ON DELETE CASCADE, -- Foreign key to the bill_detail table
--     prod_id INT REFERENCES product(prod_id) NOT NULL, -- Foreign key to the product table
--     prod_qty INT NOT NULL, -- Quantity of the product in the bill
--     prod_price DECIMAL(10, 2) NOT NULL, -- Price of the product
--     prod_total_price DECIMAL(10, 2) NOT NULL, -- Total price for the product (price * quantity)
--     UNIQUE (bill_id, prod_id) -- Ensure each product can only appear once per bill
-- );


select * from shopping_cart;

-- ALTER TABLE shopping_cart DROP CONSTRAINT shopping_cart_prod_id_key;

-- DELETE FROM shopping_cart;

-- TRUNCATE TABLE shopping_cart RESTART IDENTITY;

-- -- Step 1: Drop the existing primary key
-- ALTER TABLE shopping_cart DROP CONSTRAINT shopping_cart_pkey;

-- -- Step 2: Add the new composite primary key
-- ALTER TABLE shopping_cart ADD PRIMARY KEY (cart_id, user_id);


-- -- Step 2: Add the new composite primary key
-- ALTER TABLE shopping_cart ADD PRIMARY KEY (prod_id, user_id);



-- -- Step 2: Add the new composite primary key
-- ALTER TABLE shopping_cart ADD PRIMARY KEY (cart_id);










-- select * from product
-- where prod_name = 'Adults Plain Cotton T-Shirt - 2 Pack';



-- SELECT * 
-- FROM order_detail NATURAL JOIN product;


-- SELECT * 
-- FROM order_detail

-- select * from product;

-- select * from payment;


-- select user_name from users
-- where user_id = 1;

-- select * from users;


-- SELECT prod_id, prod_name,  prod_price, rating_stars, rating_count
-- FROM product 
-- WHERE prod_price > ANY (
--   SELECT prod_price 
--   FROM product 
--   WHERE rating_count > 150
-- );


select * from bill_detail

SELECT SUM(bill_total_price) AS total_price 
FROM bill_detail where pay_status = 'paid';

