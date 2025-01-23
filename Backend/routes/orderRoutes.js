const express = require("express");
const router = express.Router();
const pool = require("../database");

// // Create a new order
// router.post("/create", async (req, res) => {
//   try {
//     const { user_id, user_address, total_amt, order_status, order_details } = req.body;

//     console.log("Creating order with data:", req.body);

//     const newOrder = await pool.query(
//       `INSERT INTO orders (order_date, user_id, user_address, total_amt, order_status)
//        VALUES (CURRENT_DATE, $1, $2, $3, $4) RETURNING *`,
//       [user_id, user_address, total_amt, order_status]
//     );

//     console.log("New order created:", newOrder.rows[0]);

//     const orderId = newOrder.rows[0].order_id;
//     console.log("Order ID:", orderId);

//     for (const detail of order_details) {
//       console.log("Inserting order detail:", detail);
//       await pool.query(
//         `INSERT INTO order_detail (order_id, prod_id, prod_qty, prod_price, prod_total_price)
//          VALUES ($1, $2, $3, $4, $5)`,
//         [orderId, detail.prod_id, detail.prod_qty, detail.prod_price, detail.prod_total_price]
//       );
//     }

//     res.status(201).json({
//       status: "success",
//       data: newOrder.rows[0],
//       message: "Order created successfully"
//     });
//   } catch (err) {
//     console.error("Error creating order:", err.message);
//     res.status(500).json({
//       status: "error",
//       message: "Server error while creating order"
//     });
//   }
// });


router.post("/create", async (req, res) => {
  try {
    const { user_id, user_address, total_amt, order_status, order_details } = req.body;

    // Validate order_details
    if (!Array.isArray(order_details) || order_details.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "'order_details' must be a non-empty array"
      });
    }

    console.log("Creating order with data:", req.body);

    // Insert order into the orders table
    const newOrder = await pool.query(
      `INSERT INTO orders (order_date, user_id, user_address, total_amt, order_status)
       VALUES (CURRENT_DATE, $1, $2, $3, $4) RETURNING *`,
      [user_id, user_address, total_amt, order_status]
    );

    console.log("New order created:", newOrder.rows[0]);

    const orderId = newOrder.rows[0].order_id;
    console.log("Order ID:", orderId);

    // Insert each order detail
    for (const detail of order_details) {
      console.log("Inserting order detail:", detail);
      await pool.query(
        `INSERT INTO order_detail (order_id, prod_id, prod_qty, prod_price, prod_total_price)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, detail.prod_id, detail.prod_qty, detail.prod_price, detail.prod_total_price]
      );
    }

    res.status(201).json({
      status: "success",
      data: newOrder.rows[0].order_id,
      message: "Order created successfully"
    });
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while creating order"
    });
  }
});



module.exports = router;
