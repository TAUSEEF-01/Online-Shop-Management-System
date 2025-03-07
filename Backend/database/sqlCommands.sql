-- CREATE TABLE IF NOT EXISTS user (
--     user_id SERIAL PRIMARY KEY,
--     user_name VARCHAR(50) NOT NULL,
--     user_email VARCHAR(50) NOT NULL,
--     user_password VARCHAR(255) NOT NULL,
--     user_contact_no VARCHAR(20) NOT NULL,
--     is_admin BOOLEAN NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS worker (
--     worker_id SERIAL PRIMARY KEY,
--     worker_name VARCHAR(50) NOT NULL,
--     worker_email VARCHAR(50) NOT NULL,
--     worker_contact_no VARCHAR(20) NOT NULL,
--     worker_salary DOUBLE PRECISION NOT NULL
-- );

-- -- CREATE TABLE IF NOT EXISTS customer (
-- --     user_id SERIAL PRIMARY KEY,
-- --     user_name VARCHAR(20) NOT NULL,
-- --     user_email VARCHAR(50) NOT NULL,
-- --     user_contact_no VARCHAR(20) NOT NULL, 
-- -- );

-- CREATE TABLE IF NOT EXISTS product (
--     prod_id SERIAL PRIMARY KEY,
--     prod_name VARCHAR(255) UNIQUE NOT NULL,
--     prod_image VARCHAR(255) NOT NULL,
--     prod_quantity INTEGER NOT NULL,
--     prod_price DECIMAL(10,2) NOT NULL,
--     rating_stars INTEGER NOT NULL,
--     rating_count INTEGER NOT NULL,
--     prod_discount DECIMAL(5,2) DEFAULT 0.0,
--     prod_keywords JSONB NOT NULL
-- );


-- -- CREATE TABLE IF NOT EXISTS product (
-- --     prod_id SERIAL PRIMARY KEY,
-- --     prod_name VARCHAR(200) NOT NULL,
-- --     prod_image VARCHAR(255), -- image path
-- --     prod_quantity INT NOT NULL,
-- --     prod_price DOUBLE PRECISION NOT NULL,
-- --     -- prod_brand VARCHAR(20),
-- --     rating_stars INT NOT NULL,
-- --     rating_count INT NOT NULL,
-- --     prod_discount FLOAT NOT NULL,
-- --     -- prod_keywords VARCHAR(50) -- search keywords
-- --     prod_keywords JSONB,
-- -- );

-- -- CREATE TABLE IF NOT EXISTS product (
-- --     id SERIAL PRIMARY KEY,
-- --     prod_image VARCHAR(255) ,
-- --     name VARCHAR(255),
-- --     rating_stars INT,
-- --     rating_count INT,
-- --     prod_price DECIMAL(10, 2),
-- --     prod_keywords JSONB,
-- --     prod_brand VARCHAR(255),
-- --     prod_discount DECIMAL(5, 2)
-- -- );

-- CREATE TABLE IF NOT EXISTS order (
--     order_id SERIAL PRIMARY KEY,
--     order_date DATE NOT NULL,
--     user_id INT REFERENCES customer(user_id) NOT NULL,
--     user_address VARCHAR(50) NOT NULL,
--     total_amt INT NOT NULL,
--     order_status VARCHAR(20) CHECK (order_status IN ('delivered', 'in process')) NOT NULL
--     -- user_id INT REFERENCES user(user_id) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS order_detail (
--     order_id INT REFERENCES order(order_id) NOT NULL,
--     prod_id INT REFERENCES product(prod_id) NOT NULL,
--     prod_qty INT NOT NULL,
--     prod_price DOUBLE PRECISION NOT NULL,
--     prod_total_price DOUBLE PRECISION NOT NULL,
--     PRIMARY KEY (order_id, prod_id)
-- );

-- CREATE TABLE IF NOT EXISTS bill_detail (
--     bill_id SERIAL PRIMARY KEY,
--     bill_date DATE NOT NULL,
--     user_id INT REFERENCES customer(user_id) NOT NULL,
--     order_id INT REFERENCES order(order_id) NOT NULL,
--     user_name VARCHAR(20) NOT NULL,
--     prod_id INT,
--     prod_qty INT,
--     prod_price DOUBLE PRECISION,
--     prod_total_price DOUBLE PRECISION NOT NULL,
--     order_total_price DOUBLE PRECISION NOT NULL,
--     bill_total_price DOUBLE PRECISION NOT NULL,
--     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL,
--     FOREIGN KEY (order_id, prod_id) REFERENCES order_detail(order_id, prod_id)
-- );



-- CREATE TABLE IF NOT EXISTS payment (
--     pm_id SERIAL PRIMARY KEY,
--     pay_mode VARCHAR(20) NOT NULL,
--     pay_date TIMESTAMP NOT NULL,
--     pay_disc FLOAT,
--     pay_amount DOUBLE PRECISION NOT NULL,
--     bill_id INT REFERENCES bill_detail(bill_id) NOT NULL,
--     order_id INT REFERENCES order(order_id) NOT NULL,
--     user_id INT REFERENCES customer(user_id) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS shopping_cart (
--     cart_id SERIAL PRIMARY KEY,
--     prod_id INT REFERENCES product(prod_id) UNIQUE,
--     user_id INT REFERENCES customer(user_id) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS order_return (
--     order_return_id SERIAL PRIMARY KEY,
--     order_id INT REFERENCES order(order_id) NOT NULL,
--     user_id INT REFERENCES customer(user_id) NOT NULL,
--     return_date TIMESTAMP NOT NULL,
--     prod_id INT REFERENCES product(prod_id) NOT NULL,
--     return_amount DOUBLE PRECISION NOT NULL
-- );





-- -- CREATE TABLE IF NOT EXISTS bill_detail (
-- --     bill_id SERIAL PRIMARY KEY,
-- --     bill_date DATE NOT NULL,
-- --     user_id INT REFERENCES customer(user_id) NOT NULL,
-- --     order_id INT REFERENCES order(order_id) NOT NULL,
-- --     user_name VARCHAR(20) NOT NULL,
-- --     prod_id INT REFERENCES product(prod_id) NOT NULL,
-- --     prod_qty INT NOT NULL,
-- --     prod_price DOUBLE PRECISION NOT NULL,
-- --     prod_total_price DOUBLE PRECISION NOT NULL,
-- --     order_total_price DOUBLE PRECISION NOT NULL,
-- --     -- offer_disc FLOAT,
-- --     bill_total_price DOUBLE PRECISION NOT NULL,
-- --     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL
-- --     --worker_id INT REFERENCES worker(worker_id) NOT NULL
-- -- );





---------------------------------------------------------------------------



-- CREATE TABLE IF NOT EXISTS users (
--     user_id SERIAL PRIMARY KEY,
--     user_name VARCHAR(50) NOT NULL,
--     user_email VARCHAR(50) UNIQUE NOT NULL,
--     user_password VARCHAR(255) NOT NULL,
--     user_contact_no VARCHAR(20) NOT NULL,
--     is_admin BOOLEAN NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS worker (
--     worker_id SERIAL PRIMARY KEY,
--     worker_name VARCHAR(50) NOT NULL,
--     worker_email VARCHAR(50) NOT NULL,
--     worker_contact_no VARCHAR(20) NOT NULL,
--     worker_salary DOUBLE PRECISION NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS product (
--     prod_id SERIAL PRIMARY KEY,
--     prod_name VARCHAR(255) UNIQUE NOT NULL,
--     prod_image VARCHAR(255) NOT NULL,
--     prod_quantity INTEGER NOT NULL, 
--     prod_price DECIMAL(10,2) NOT NULL,
--     rating_stars INTEGER NOT NULL,
--     rating_count INTEGER NOT NULL,
--     prod_discount DECIMAL(5,2) DEFAULT 0.0,
--     prod_keywords JSONB NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS orders (
--     order_id SERIAL PRIMARY KEY,
--     order_date DATE NOT NULL,
--     user_id INT REFERENCES users(user_id) NOT NULL,
--     user_address VARCHAR(50) NOT NULL,
--     total_amt INT NOT NULL,
--     order_status VARCHAR(20) CHECK (order_status IN ('delivered', 'in process')) NOT NULL
-- ); 

-- -- order_details x product --natural join

-- CREATE TABLE IF NOT EXISTS order_detail (
--     order_id INT REFERENCES orders(order_id) NOT NULL,
--     prod_id INT REFERENCES product(prod_id) NOT NULL,
--     prod_qty INT NOT NULL,
--     prod_price DOUBLE PRECISION NOT NULL,
--     prod_total_price DOUBLE PRECISION NOT NULL,
--     PRIMARY KEY (order_id, prod_id)
-- );

-- -- CREATE TABLE IF NOT EXISTS bill_detail (
-- --     bill_id SERIAL PRIMARY KEY,
-- --     bill_date DATE NOT NULL,
-- --     user_id INT REFERENCES users(user_id) NOT NULL,
-- --     order_id INT REFERENCES orders(order_id) NOT NULL,
-- --     user_name VARCHAR(20) NOT NULL,
-- --     prod_id INT,
-- --     prod_qty INT,
-- --     prod_price DOUBLE PRECISION,
-- --     prod_total_price DOUBLE PRECISION NOT NULL,
-- --     order_total_price DOUBLE PRECISION NOT NULL,
-- --     bill_total_price DOUBLE PRECISION NOT NULL,
-- --     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL,
-- --     FOREIGN KEY (order_id, prod_id) REFERENCES order_detail(order_id, prod_id)
-- -- );



-- -- CREATE TABLE IF NOT EXISTS bill_detail (
-- --     bill_id SERIAL PRIMARY KEY,
-- --     bill_date DATE NOT NULL,
-- --     user_id INT REFERENCES users(user_id) NOT NULL,
-- --     order_id INT NOT NULL,
-- --     user_name VARCHAR(20) NOT NULL,
-- --     prod_id INT NOT NULL,
-- --     prod_qty INT NOT NULL,
-- --     prod_price DOUBLE PRECISION NOT NULL,
-- --     prod_total_price DOUBLE PRECISION NOT NULL,
-- --     order_total_price DOUBLE PRECISION NOT NULL,
-- --     bill_total_price DOUBLE PRECISION NOT NULL,
-- --     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL,
-- --     FOREIGN KEY (order_id) REFERENCES orders(order_id)
-- -- );


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


-- -- CREATE TABLE IF NOT EXISTS bill_product (
-- --     bill_product_id SERIAL PRIMARY KEY, -- Auto-incrementing ID for the product in the bill
-- --     bill_id INT REFERENCES bill_detail(bill_id) ON DELETE CASCADE, -- Foreign key to the bill_detail table
-- --     prod_id INT REFERENCES product(prod_id) NOT NULL, -- Foreign key to the product table
-- --     prod_qty INT NOT NULL, -- Quantity of the product in the bill
-- --     prod_price DECIMAL(10, 2) NOT NULL, -- Price of the product
-- --     prod_total_price DECIMAL(10, 2) NOT NULL, -- Total price for the product (price * quantity)
-- --     UNIQUE (bill_id, prod_id) -- Ensure each product can only appear once per bill
-- -- );




-- -- CREATE TABLE IF NOT EXISTS payment (
-- --     pm_id SERIAL PRIMARY KEY,
-- --     pay_mode VARCHAR(20) NOT NULL,
-- --     pay_date TIMESTAMP NOT NULL,
-- --     pay_disc FLOAT,
-- --     pay_amount DOUBLE PRECISION NOT NULL,
-- --     bill_id INT REFERENCES bill_detail(bill_id) NOT NULL,
-- --     order_id INT REFERENCES orders(order_id) NOT NULL,
-- --     user_id INT REFERENCES users(user_id) NOT NULL
-- -- );




-- CREATE TABLE IF NOT EXISTS shopping_cart (
--     cart_id SERIAL,
--     prod_id INT REFERENCES product(prod_id),
--     user_id INT REFERENCES users(user_id) NOT NULL
--     PRIMARY KEY (prod_id, user_id)
-- );

-- CREATE TABLE IF NOT EXISTS order_return (
--     order_return_id SERIAL PRIMARY KEY,
--     order_id INT REFERENCES orders(order_id) NOT NULL,
--     user_id INT REFERENCES users(user_id) NOT NULL,
--     return_date TIMESTAMP NOT NULL,
--     prod_id INT REFERENCES product(prod_id) NOT NULL,
--     return_amount DOUBLE PRECISION NOT NULL
-- );





------------------------------------------------------------------------------





CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_contact_no VARCHAR(20) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS worker (
    worker_id SERIAL PRIMARY KEY,
    worker_name VARCHAR(50) NOT NULL,
    worker_email VARCHAR(50) NOT NULL,
    worker_contact_no VARCHAR(20) NOT NULL,
    worker_salary DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    prod_id SERIAL PRIMARY KEY,
    prod_name VARCHAR(255) UNIQUE NOT NULL,
    prod_image VARCHAR(255) NOT NULL,
    prod_quantity INTEGER NOT NULL, 
    prod_price DECIMAL(10,2) NOT NULL,
    rating_stars INTEGER NOT NULL,
    rating_count INTEGER NOT NULL,
    prod_discount DECIMAL(5,2) DEFAULT 0.0,
    prod_keywords JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
    user_address VARCHAR(50) NOT NULL,
    total_amt INT NOT NULL,
    order_status VARCHAR(20) CHECK (order_status IN ('delivered', 'in process')) NOT NULL
); 


CREATE TABLE IF NOT EXISTS order_detail (
    order_id INT REFERENCES orders(order_id) NOT NULL,
    prod_id INT REFERENCES product(prod_id) NOT NULL,
    prod_qty INT NOT NULL,
    prod_price DOUBLE PRECISION NOT NULL,
    prod_total_price DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (order_id, prod_id)
);


CREATE TABLE IF NOT EXISTS bill_detail (
    bill_id SERIAL PRIMARY KEY, -- Automatically incrementing bill ID
    bill_date DATE NOT NULL, -- Date of the bill (set to current date)
    user_id INT REFERENCES users(user_id) NOT NULL, -- Foreign key to users table
    order_id INT REFERENCES orders(order_id) NOT NULL, -- Foreign key to orders table
    user_name VARCHAR(100) NOT NULL, -- Name of the user
    order_total_price DECIMAL(10, 2) NOT NULL, -- Total price of the order
    bill_total_price DECIMAL(10, 2) NOT NULL, -- Total price of the bill (after any adjustments)
    pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL -- Payment status of the bill
);


CREATE TABLE IF NOT EXISTS shopping_cart (
    cart_id SERIAL,
    prod_id INT REFERENCES product(prod_id),
    user_id INT REFERENCES users(user_id) NOT NULL
    PRIMARY KEY (prod_id, user_id)
);

CREATE TABLE IF NOT EXISTS order_return (
    order_return_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
    return_date TIMESTAMP NOT NULL,
    prod_id INT REFERENCES product(prod_id) NOT NULL,
    return_amount DOUBLE PRECISION NOT NULL
);



-- Drop existing foreign key constraints
ALTER TABLE orders DROP CONSTRAINT orders_user_id_fkey;
ALTER TABLE bill_detail DROP CONSTRAINT bill_detail_user_id_fkey;
ALTER TABLE order_return DROP CONSTRAINT order_return_user_id_fkey;
ALTER TABLE shopping_cart DROP CONSTRAINT shopping_cart_user_id_fkey;

-- Add foreign keys with ON UPDATE CASCADE
ALTER TABLE orders 
ADD CONSTRAINT orders_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(user_id) 
ON UPDATE CASCADE;

ALTER TABLE bill_detail 
ADD CONSTRAINT bill_detail_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(user_id) 
ON UPDATE CASCADE;

ALTER TABLE order_return 
ADD CONSTRAINT order_return_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(user_id) 
ON UPDATE CASCADE;

ALTER TABLE shopping_cart 
ADD CONSTRAINT shopping_cart_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(user_id) 
ON UPDATE CASCADE;




CREATE OR REPLACE FUNCTION update_bill_detail_user_name()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE bill_detail 
    SET user_name = NEW.user_name 
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;




CREATE TRIGGER trigger_update_bill_user_name
AFTER UPDATE ON users
FOR EACH ROW
WHEN (OLD.user_name IS DISTINCT FROM NEW.user_name)
EXECUTE FUNCTION update_bill_detail_user_name();
