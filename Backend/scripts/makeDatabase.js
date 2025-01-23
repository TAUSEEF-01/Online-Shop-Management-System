const { Pool } = require('pg');


// First create a pool without database selected
const initialPool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432
});

// Create database if it doesn't exist
initialPool.query(`
    SELECT FROM pg_database WHERE datname = 'shopmanagementsystem'
`, (err, res) => {
    if (err) {
        console.error('Error checking database:', err);
        return;
    }
    
    if (res.rows.length === 0) {
        initialPool.query('CREATE DATABASE shopmanagementsystem', (err, res) => {
            if (err) {
                console.error('Error creating database:', err);
                return;
            }
            console.log('Database created successfully');
            initialPool.end();
            
            // After database is created, create tables
            setupTables();
        });
    } else {
        initialPool.end();
        setupTables();
    }
});

function setupTables() {
    const pool = new Pool({
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'shopmanagementsystem'
    });

    const queries = [
        `CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR(50) NOT NULL,
            user_email VARCHAR(50) NOT NULL,
            user_password VARCHAR(255) NOT NULL,
            user_contact_no VARCHAR(20) NOT NULL,
            is_admin BOOLEAN NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS worker (
            worker_id SERIAL PRIMARY KEY,
            worker_name VARCHAR(50) NOT NULL,
            worker_email VARCHAR(50) NOT NULL,
            worker_contact_no VARCHAR(20) NOT NULL,
            worker_salary DOUBLE PRECISION NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS product (
            prod_id SERIAL PRIMARY KEY,
            prod_name VARCHAR(255) UNIQUE NOT NULL,
            prod_image VARCHAR(255) NOT NULL,
            prod_quantity INTEGER NOT NULL,
            prod_price DECIMAL(10,2) NOT NULL,
            rating_stars INTEGER NOT NULL,
            rating_count INTEGER NOT NULL,
            prod_discount DECIMAL(5,2) DEFAULT 0.0,
            prod_keywords JSONB NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            order_date DATE NOT NULL,
            user_id INT REFERENCES users(user_id) NOT NULL,
            user_address VARCHAR(50) NOT NULL,
            total_amt DECIMAL(10, 2) NOT NULL,
            order_status VARCHAR(20) CHECK (order_status IN ('delivered', 'in process')) NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS order_detail (
            order_id INT REFERENCES orders(order_id) NOT NULL,
            prod_id INT REFERENCES product(prod_id) NOT NULL,
            prod_qty INT NOT NULL,
            prod_price DOUBLE PRECISION NOT NULL,
            prod_total_price DOUBLE PRECISION NOT NULL,
            PRIMARY KEY (order_id, prod_id)
        );`,

        // `CREATE TABLE IF NOT EXISTS bill_detail (
        //     bill_id SERIAL PRIMARY KEY,
        //     bill_date DATE NOT NULL,
        //     user_id INT REFERENCES users(user_id) NOT NULL,
        //     order_id INT NOT NULL,
        //     user_name VARCHAR(20) NOT NULL,
        //     prod_id INT NOT NULL,
        //     prod_qty INT NOT NULL,
        //     prod_price DOUBLE PRECISION NOT NULL,
        //     prod_total_price DOUBLE PRECISION NOT NULL,
        //     order_total_price DOUBLE PRECISION NOT NULL,
        //     bill_total_price DOUBLE PRECISION NOT NULL,
        //     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL,
        //     FOREIGN KEY (order_id) REFERENCES orders(order_id)
        // );`,
        


        `CREATE TABLE IF NOT EXISTS bill_detail (
            bill_id SERIAL PRIMARY KEY, 
            bill_date DATE NOT NULL, 
            user_id INT REFERENCES users(user_id) NOT NULL,
            order_id INT REFERENCES orders(order_id) NOT NULL,
            user_name VARCHAR(100) NOT NULL,
            order_total_price DECIMAL(10, 2) NOT NULL, 
            bill_total_price DECIMAL(10, 2) NOT NULL, 
            pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL 
        );`,

        `CREATE TABLE IF NOT EXISTS bill_product (
            bill_product_id SERIAL PRIMARY KEY,
            bill_id INT REFERENCES bill_detail(bill_id) ON DELETE CASCADE, 
            prod_id INT REFERENCES product(prod_id) NOT NULL,
            prod_qty INT NOT NULL,
            prod_price DECIMAL(10, 2) NOT NULL,
            prod_total_price DECIMAL(10, 2) NOT NULL, 
            UNIQUE (bill_id, prod_id)
        );`,



        // `CREATE TABLE IF NOT EXISTS bill_detail (
        //     bill_id SERIAL PRIMARY KEY,
        //     bill_date DATE NOT NULL,
        //     user_id INT REFERENCES users(user_id) NOT NULL,
        //     order_id INT REFERENCES orders(order_id) NOT NULL,
        //     user_name VARCHAR(20) NOT NULL,
        //     prod_id INT,
        //     prod_qty INT,
        //     prod_price DOUBLE PRECISION,
        //     prod_total_price DOUBLE PRECISION NOT NULL,
        //     order_total_price DOUBLE PRECISION NOT NULL,
        //     bill_total_price DOUBLE PRECISION NOT NULL,
        //     pay_status VARCHAR(20) CHECK (pay_status IN ('paid', 'unpaid')) NOT NULL,
        //     FOREIGN KEY (order_id, prod_id) REFERENCES order_detail(order_id, prod_id)
        // );`,

        `CREATE TABLE IF NOT EXISTS payment (
            pm_id SERIAL PRIMARY KEY,
            pay_mode VARCHAR(20) NOT NULL,
            pay_date TIMESTAMP NOT NULL,
            pay_disc FLOAT,
            pay_amount DOUBLE PRECISION NOT NULL,
            bill_id INT REFERENCES bill_detail(bill_id) NOT NULL,
            order_id INT REFERENCES orders(order_id) NOT NULL,
            user_id INT REFERENCES users(user_id) NOT NULL
        );`,

        // `CREATE TABLE IF NOT EXISTS shopping_cart (
        //     cart_id SERIAL PRIMARY KEY,
        //     prod_id INT REFERENCES product(prod_id) UNIQUE,
        //     user_id INT REFERENCES users(user_id) NOT NULL
        // );`,

        `CREATE TABLE IF NOT EXISTS shopping_cart (
            cart_id SERIAL,
            prod_id INT REFERENCES product(prod_id),
            user_id INT REFERENCES users(user_id) NOT NULL
            PRIMARY KEY (prod_id, user_id)
        );`,

        `CREATE TABLE IF NOT EXISTS order_return (
            order_return_id SERIAL PRIMARY KEY,
            order_id INT REFERENCES orders(order_id) NOT NULL,
            user_id INT REFERENCES users(user_id) NOT NULL,
            return_date TIMESTAMP NOT NULL,
            prod_id INT REFERENCES product(prod_id) NOT NULL,
            return_amount DOUBLE PRECISION NOT NULL
        );`
    ];

    // Execute queries sequentially
    (async () => {
        try {
            for (const query of queries) {
                await pool.query(query);
                console.log("Table created successfully");
            }
            console.log("All tables created successfully");
        } catch (err) {
            console.error('Error creating tables:', err);
        } finally {
            pool.end();
        }
    })();
}

module.exports = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'shopmanagementsystem'
});
