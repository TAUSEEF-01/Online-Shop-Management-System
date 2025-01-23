const express = require("express");
const router = express.Router();
const pool = require("../database");

// Create a new product
router.post("/add", async (req, res) => {
  try {
    const newProduct = req.body;
    if (!newProduct.prod_name || !newProduct.prod_image || !newProduct.prod_quantity || 
        !newProduct.prod_price || !newProduct.rating_stars || !newProduct.rating_count || 
        !Array.isArray(newProduct.prod_keywords)) {
        return res.status(400).json({
            status: "error",
            message: "Missing required product information"
        });
    }
    
    const addedProduct = await pool.query(
      "INSERT INTO product (prod_name, prod_image, prod_quantity, prod_price, rating_stars, rating_count, prod_discount, prod_keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        newProduct.prod_name,
        newProduct.prod_image,
        newProduct.prod_quantity,
        newProduct.prod_price,
        newProduct.rating_stars,
        newProduct.rating_count,
        newProduct.prod_discount,
        JSON.stringify(newProduct.prod_keywords)
      ]
    );

    res.status(201).json({
      status: "success",
      data: addedProduct.rows[0],
      message: "Product added successfully"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while adding product"
    });
  }
});

// Get all products
router.get("/allProducts", async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM product");
        res.status(200).json({
            status: "success",
            data: products.rows,
            message: "Products retrieved successfully"
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Server error while retrieving products"
        });
    }
});


// queries --->
// Utility to query the database
const dbQuery = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
};


// vii. Update and Delete
router.put('/update-product', async (req, res) => {
  const { prod_id, discount } = req.body;
  const query = `
    UPDATE product 
    SET prod_discount = $1 
    WHERE prod_id = $2
    RETURNING *;
  `;
  res.json(await dbQuery(query, [discount, prod_id]));
});


// i. Natural Join, Cross Product, Outer Join, Join with USING, ON
router.get('/natural-join', async (req, res) => {
  const query = `
    SELECT * 
    FROM order_detail NATURAL JOIN product;
  `;
  res.json(await dbQuery(query));
});

router.get('/cross-product', async (req, res) => {
  const query = `
    SELECT * 
    FROM users, orders;
  `;
  res.json(await dbQuery(query));
});

router.get('/outer-join', async (req, res) => {
  const query = `
    SELECT o.*, u.user_name 
    FROM orders o 
    FULL OUTER JOIN users u 
    ON o.user_id = u.user_id;
  `;
  res.json(await dbQuery(query));
});

router.get('/join-using', async (req, res) => {
  const query = `
    SELECT * 
    FROM orders 
    JOIN users 
    USING(user_id);
  `;
  res.json(await dbQuery(query));
});

router.get('/join-on', async (req, res) => {
  const query = `
    SELECT * 
    FROM order_detail od 
    JOIN product p 
    ON od.prod_id = p.prod_id;
  `;
  res.json(await dbQuery(query));
});

// ii. Nested Sub-queries with clauses
router.get('/nested-any', async (req, res) => {
  const query = `
    SELECT * 
    FROM product 
    WHERE prod_price > ANY (
        SELECT prod_price 
        FROM product 
        WHERE rating_stars > 4
    );
  `;
  res.json(await dbQuery(query));
});

// iii. Nested Sub-query in FROM and SELECT
router.get('/nested-from', async (req, res) => {
  const query = `
    SELECT avg_price 
    FROM (
        SELECT AVG(prod_price) AS avg_price 
        FROM product
    ) AS avg_result;
  `;
  res.json(await dbQuery(query));
});

// iv. ORDER BY, GROUP BY, HAVING
router.get('/order-by', async (req, res) => {
  const query = `
    SELECT * 
    FROM product 
    ORDER BY prod_price DESC;
  `;
  res.json(await dbQuery(query));
});

router.get('/group-by', async (req, res) => {
  const query = `
    SELECT user_id, COUNT(*) AS order_count 
    FROM orders 
    GROUP BY user_id;
  `;
  res.json(await dbQuery(query));
});

router.get('/having', async (req, res) => {
  const query = `
    SELECT user_id, COUNT(*) AS order_count 
    FROM orders 
    GROUP BY user_id 
    HAVING COUNT(*) > 5;
  `;
  res.json(await dbQuery(query));
});

// v. WITH Clause
router.get('/with-clause', async (req, res) => {
  const query = `
    WITH high_rated_products AS (
        SELECT * 
        FROM product 
        WHERE rating_stars >= 4
    )
    SELECT * 
    FROM high_rated_products;
  `;
  res.json(await dbQuery(query));
});

// vi. String Operations
router.get('/string-operations', async (req, res) => {
  const query = `
    SELECT prod_name, 
           LOWER(prod_name) AS lower_name, 
           UPPER(prod_name) AS upper_name 
    FROM product;
  `;
  res.json(await dbQuery(query));
});



router.delete('/delete-cart-item', async (req, res) => {
  const { prod_id } = req.body;
  const query = `
    DELETE FROM shopping_cart 
    WHERE prod_id = $1 
    RETURNING *;
  `;
  res.json(await dbQuery(query, [prod_id]));
});

// viii. Aggregate Functions
router.get('/aggregate-functions', async (req, res) => {
  const query = `
    SELECT AVG(prod_price) AS avg_price, 
           SUM(prod_price) AS total_price 
    FROM product;
  `;
  res.json(await dbQuery(query));
});


module.exports = router;
