DROP TABLE IF EXISTS product;

CREATE TABLE product (
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
