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

// Get product by ID
router.get("/:prod_id", async (req, res) => {
  const { prod_id } = req.params;
  try {
    const product = await pool.query("SELECT * FROM product WHERE prod_id = $1", [prod_id]);
    console.log("product", product);
    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      status: "success",
      data: product.rows[0],
      message: "Product retrieved successfully"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while retrieving product"
    });
  }
});

// queries --->
// Utility to query the database
// const dbQuery = async (query, params = []) => {
//   try {
//     const result = await pool.query(query, params);
//     return result.rows;
//   } catch (err) {
//     console.error('Database error:', err);
//     throw err;
//   }
// };

const dbQuery = async (query, params = []) => {
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    return result.rows; // Ensure this returns an array of objects
  } catch (error) {
    console.error("Database query error:", error);
    throw error; // Propagate error for the client to handle
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


// Update product information
router.put('/update-product-info/:prod_id', async (req, res) => {
  const { prod_id } = req.params;
  const { prod_name, prod_image, prod_quantity, prod_price, rating_stars, rating_count, prod_discount, prod_keywords } = req.body;

  try {
    const query = `
      UPDATE product 
      SET prod_name = $1, prod_image = $2, prod_quantity = $3, prod_price = $4, rating_stars = $5, rating_count = $6, prod_discount = $7, prod_keywords = $8
      WHERE prod_id = $9
      RETURNING *;
    `;
    const updatedProduct = await pool.query(query, [prod_name, prod_image, prod_quantity, prod_price, rating_stars, rating_count, prod_discount, JSON.stringify(prod_keywords), prod_id]);

    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      status: "success",
      data: updatedProduct.rows[0],
      message: "Product updated successfully"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while updating product"
    });
  }
});


// // i. Natural Join, Cross Product, Outer Join, Join with USING, ON
// router.get('/natural-join', async (req, res) => {
//   const query = `
//     SELECT * 
//     FROM order_detail NATURAL JOIN product;
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/natural-join', async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM order_detail NATURAL JOIN product;
    `;
    const results = await pool.query(query);
    // console.log("Raw query results:", results.rowCount);
    // const results = await dbQuery(query);
    // console.log("Raw results:", results);
    res.status(200).json({results,
      message: "Fetched natural join data successfully"
  }); // Ensure `results` is JSON serializable
  } catch (error) {
    console.error("Error fetching natural join data:", error);
    res.status(500).json({ message: "Failed to fetch data", error: error.message });
  }
});



// router.get('/cross-product', async (req, res) => {
//   const query = `
//     SELECT * 
//     FROM users, orders;
//   `;
//   res.json(await dbQuery(query));
// });


router.get('/cross-product', async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM users, orders; -- Cross product of users and orders tables
    `;
    const results = await pool.query(query); // Use pool.query to execute the query

    // Log the number of rows fetched (optional for debugging)
    console.log("Raw query results (rowCount):", results.rowCount);

    // Respond with the results and a success message
    res.status(200).json({
      results: results.rows, // Only send the rows
      message: "Fetched cross-product data successfully"
    });
  } catch (error) {
    console.error("Error fetching cross-product data:", error);

    // Handle errors and send a response
    res.status(500).json({ 
      message: "Failed to fetch data", 
      error: error.message 
    });
  }
});


// router.get('/outer-join', async (req, res) => {
//   const query = `
//     SELECT o.*, u.user_name 
//     FROM orders o 
//     FULL OUTER JOIN users u 
//     ON o.user_id = u.user_id;
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/outer-join', async (req, res) => {
  try {
    const query = `
      SELECT o.*, u.user_name 
      FROM orders o 
      FULL OUTER JOIN users u 
      ON o.user_id = u.user_id;
    `;
    const results = await pool.query(query); // Use pool.query to execute the query

    // Log the number of rows fetched (optional for debugging)
    console.log("Raw query results (rowCount):", results.rowCount);

    // Respond with the results and a success message
    res.status(200).json({
      results: results.rows, // Only send the rows
      message: "Fetched outer join data successfully"
    });
  } catch (error) {
    console.error("Error fetching outer join data:", error);

    // Handle errors and send a response
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});


// router.get('/join-using', async (req, res) => {
//   const query = `
//     SELECT * 
//     FROM orders 
//     JOIN users 
//     USING(user_id);
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/join-using', async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM orders 
      JOIN users 
      USING(user_id);
    `;
    const results = await pool.query(query); // Use pool.query to execute the query

    // Log the number of rows fetched (optional for debugging)
    console.log("Raw query results (rowCount):", results.rowCount);

    // Respond with the results and a success message
    res.status(200).json({
      results: results.rows, // Only send the rows
      message: "Fetched join-using data successfully"
    });
  } catch (error) {
    console.error("Error fetching join-using data:", error);

    // Handle errors and send a response
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



// router.get('/join-on', async (req, res) => {
//   const query = `
//     SELECT * 
//     FROM order_detail od 
//     JOIN product p 
//     ON od.prod_id = p.prod_id;
//   `;
//   res.json(await dbQuery(query));
// });

// // ii. Nested Sub-queries with clauses
// router.get('/nested-any', async (req, res) => {
//   const query = `
//     SELECT * 
//     FROM product 
//     WHERE prod_price > ANY (
//         SELECT prod_price 
//         FROM product 
//         WHERE rating_stars > 4
//     );
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/join-on', async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM order_detail od 
      JOIN product p 
      ON od.prod_id = p.prod_id;
    `;
    const results = await pool.query(query); // Execute the query using pool.query

    // Log the row count for debugging (optional)
    console.log("Raw query results (rowCount):", results.rowCount);

    // Respond with the fetched rows and a success message
    res.status(200).json({
      results: results.rows, // Return only the rows
      message: "Fetched join-on data successfully"
    });
  } catch (error) {
    console.error("Error fetching join-on data:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



router.get('/nested-any', async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM product 
      WHERE prod_price > ANY (
          SELECT prod_price 
          FROM product 
          WHERE rating_stars > 4
      );
    `;
    const results = await pool.query(query); // Execute the query using pool.query

    // Log the row count for debugging (optional)
    console.log("Raw query results (rowCount):", results.rowCount);

    // Respond with the fetched rows and a success message
    res.status(200).json({
      results: results.rows, // Return only the rows
      message: "Fetched nested-any data successfully"
    });
  } catch (error) {
    console.error("Error fetching nested-any data:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});


// // iii. Nested Sub-query in FROM and SELECT
// router.get('/nested-from', async (req, res) => {
//   const query = `
//     SELECT avg_price 
//     FROM (
//         SELECT AVG(prod_price) AS avg_price 
//         FROM product
//     ) AS avg_result;
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/nested-from', async (req, res) => {
  try {
    const query = `
      SELECT avg_price 
      FROM (
          SELECT AVG(prod_price) AS avg_price 
          FROM product
      ) AS avg_result;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched nested-from data successfully"
    });
  } catch (error) {
    console.error("Error fetching nested-from data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



// // iv. ORDER BY, GROUP BY, HAVING
// router.get('/order-by', async (req, res) => {
//   const query = `
//     SELECT * 
//     FROM product 
//     ORDER BY prod_price DESC;
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/order-by', async (req, res) => {
  try {
    const query = `
      SELECT * 
      FROM product 
      ORDER BY prod_price DESC;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched order-by data successfully"
    });
  } catch (error) {
    console.error("Error fetching order-by data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



// router.get('/group-by', async (req, res) => {
//   const query = `
//     SELECT user_id, COUNT(*) AS order_count 
//     FROM orders 
//     GROUP BY user_id;
//   `;
//   res.json(await dbQuery(query));
// });

router.get('/group-by', async (req, res) => {
  try {
    const query = `
      SELECT user_id, COUNT(*) AS order_count 
      FROM orders 
      GROUP BY user_id;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched group-by data successfully"
    });
  } catch (error) {
    console.error("Error fetching group-by data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



// router.get('/having', async (req, res) => {
//   const query = `
//     SELECT user_id, COUNT(*) AS order_count 
//     FROM orders 
//     GROUP BY user_id 
//     HAVING COUNT(*) > 5;
//   `;
//   res.json(await dbQuery(query));
// });



router.get('/having', async (req, res) => {
  try {
    const query = `
      SELECT user_id, COUNT(*) AS order_count 
      FROM orders 
      GROUP BY user_id 
      HAVING COUNT(*) > 5;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched having data successfully"
    });
  } catch (error) {
    console.error("Error fetching having data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});


// // v. WITH Clause
// router.get('/with-clause', async (req, res) => {
//   const query = `
//     WITH high_rated_products AS (
//         SELECT * 
//         FROM product 
//         WHERE rating_stars >= 4
//     )
//     SELECT * 
//     FROM high_rated_products;
//   `;
//   res.json(await dbQuery(query));
// });


router.get('/with-clause', async (req, res) => {
  try {
    const query = `
      WITH high_rated_products AS (
          SELECT * 
          FROM product 
          WHERE rating_stars >= 4
      )
      SELECT * 
      FROM high_rated_products;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched with-clause data successfully"
    });
  } catch (error) {
    console.error("Error fetching with-clause data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});




// // vi. String Operations
// router.get('/string-operations', async (req, res) => {
//   const query = `
//     SELECT prod_name, 
//            LOWER(prod_name) AS lower_name, 
//            UPPER(prod_name) AS upper_name 
//     FROM product;
//   `;
//   res.json(await dbQuery(query));
// });


router.get('/string-operations', async (req, res) => {
  try {
    const query = `
      SELECT prod_name, 
             LOWER(prod_name) AS lower_name, 
             UPPER(prod_name) AS upper_name 
      FROM product;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched string operations data successfully"
    });
  } catch (error) {
    console.error("Error fetching string operations data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



// router.delete('/delete-cart-item', async (req, res) => {
//   const { prod_id } = req.body;
//   const query = `
//     DELETE FROM shopping_cart 
//     WHERE prod_id = $1 
//     RETURNING *;
//   `;
//   res.json(await dbQuery(query, [prod_id]));
// });





// // viii. Aggregate Functions
// router.get('/aggregate-functions', async (req, res) => {
//   const query = `
//     SELECT AVG(prod_price) AS avg_price, 
//            SUM(prod_price) AS total_price 
//     FROM product;
//   `;
//   res.json(await dbQuery(query));
// });


router.get('/aggregate-functions', async (req, res) => {
  try {
    const query = `
      SELECT AVG(prod_price) AS avg_price, 
             SUM(prod_price) AS total_price 
      FROM product;
    `;
    const results = await pool.query(query);

    console.log("Raw query results (rowCount):", results.rowCount);

    res.status(200).json({
      results: results.rows,
      message: "Fetched aggregate function data successfully"
    });
  } catch (error) {
    console.error("Error fetching aggregate function data:", error);

    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  }
});



module.exports = router;
