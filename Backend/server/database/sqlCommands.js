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


