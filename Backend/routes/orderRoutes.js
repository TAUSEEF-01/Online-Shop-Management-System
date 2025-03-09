const express = require("express");
const router = express.Router();
const pool = require("../database");

// // Create a new order
// router.post("/create", async (req, res) => {
//   try {
//     const { user_id, delivery_address, total_amt, order_status, order_details } = req.body;

//     console.log("Creating order with data:", req.body);

//     const newOrder = await pool.query(
//       `INSERT INTO orders (order_date, user_id, delivery_address, total_amt, order_status)
//        VALUES (CURRENT_DATE, $1, $2, $3, $4) RETURNING *`,
//       [user_id, delivery_address, total_amt, order_status]
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
    const {
      user_id,
      delivery_address,
      total_amt,
      order_status,
      order_details,
    } = req.body;

    // Validate order_details
    if (!Array.isArray(order_details) || order_details.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "'order_details' must be a non-empty array",
      });
    }

    console.log("Creating order with data:", req.body);

    // Insert order into the orders table
    const newOrder = await pool.query(
      `INSERT INTO orders (order_date, user_id, delivery_address, total_amt, order_status)
       VALUES (CURRENT_DATE, $1, $2, $3, $4) RETURNING *`,
      [user_id, delivery_address, total_amt, order_status]
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
        [
          orderId,
          detail.prod_id,
          detail.prod_qty,
          detail.prod_price,
          detail.prod_total_price,
        ]
      );
    }

    res.status(201).json({
      status: "success",
      data: newOrder.rows[0].order_id,
      message: "Order created successfully",
    });
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while creating order",
    });
  }
});

// Add new endpoint to change order status
router.put("/update-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { order_status } = req.body;

    // Validate order_status
    if (!["delivered", "in process"].includes(order_status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid order status",
      });
    }

    const updatedOrder = await pool.query(
      `UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *`,
      [order_status, orderId]
    );

    if (updatedOrder.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedOrder.rows[0],
      message: "Order status updated successfully",
    });
  } catch (err) {
    console.error("Error updating order status:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while updating order status",
    });
  }
});

// Add new endpoint to fetch all orders
router.get("/all", async (req, res) => {
  try {
    const allOrders = await pool.query(`SELECT * FROM orders`);
    res.status(200).json({
      status: "success",
      data: allOrders.rows,
    });
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching orders",
    });
  }
});

// Add endpoint for creating order returns
router.post("/return", async (req, res) => {
  try {
    const { order_id, user_id, prod_id, return_amount } = req.body;

    // Validate required fields
    if (!order_id || !user_id || !prod_id || !return_amount) {
      return res.status(400).json({
        status: "error",
        message: `Missing required fields: ${[
          !order_id && "order_id",
          !user_id && "user_id",
          !prod_id && "prod_id",
          !return_amount && "return_amount",
        ]
          .filter(Boolean)
          .join(", ")}`,
      });
    }

    // Check if return already exists
    const existingReturn = await pool.query(
      `SELECT * FROM order_return 
       WHERE order_id = $1 AND prod_id = $2`,
      [order_id, prod_id]
    );

    if (existingReturn.rows.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "This product has already been returned for this order",
      });
    }

    const newReturn = await pool.query(
      `INSERT INTO order_return (order_id, user_id, return_date, prod_id, return_amount)
       VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4) RETURNING *`,
      [order_id, user_id, prod_id, return_amount]
    );

    res.status(201).json({
      status: "success",
      data: newReturn.rows[0],
      message: "Order return created successfully",
    });
  } catch (err) {
    console.error("Error creating order return:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Server error while creating order return",
    });
  }
});

// Add new endpoint to fetch order details by order_id
router.get("/details/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderDetails = await pool.query(
      `SELECT o.order_id, od.prod_id, o.total_amt as total_amount
       FROM orders o
       JOIN order_detail od ON o.order_id = od.order_id
       WHERE o.order_id = $1`,
      [orderId]
    );

    if (orderDetails.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: orderDetails.rows[0],
    });
  } catch (err) {
    console.error("Error fetching order details:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching order details",
    });
  }
});

// Add endpoint to get order details from bill ID
router.get("/details/bill/:billId", async (req, res) => {
  try {
    const { billId } = req.params;

    const orderDetails = await pool.query(
      `SELECT o.order_id, 
              o.total_amt as total_amount,
              json_agg(json_build_object(
                'prod_id', od.prod_id,
                'prod_qty', od.prod_qty,
                'prod_price', od.prod_price,
                'prod_total_price', od.prod_total_price
              )) as products
       FROM orders o
       JOIN bill_detail b ON b.order_id = o.order_id
       JOIN order_detail od ON o.order_id = od.order_id
       WHERE b.bill_id = $1
       GROUP BY o.order_id, o.total_amt`,
      [billId]
    );

    if (orderDetails.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Order not found for this bill",
      });
    }

    res.status(200).json({
      status: "success",
      data: orderDetails.rows[0],
    });
  } catch (err) {
    console.error("Error fetching order details from bill:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching order details",
    });
  }
});

// Add endpoint to check if order has been returned
router.get("/check-return/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const returnCheck = await pool.query(
      `SELECT * FROM order_return WHERE order_id = $1`,
      [orderId]
    );

    res.status(200).json({
      status: "success",
      isReturned: returnCheck.rows.length > 0,
    });
  } catch (err) {
    console.error("Error checking order return:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while checking order return",
    });
  }
});

// Add endpoint to get total number of orders
router.get("/total-orders", async (req, res) => {
  try {
    const result = await pool.query(`SELECT COUNT(*) as total FROM orders`);
    res.status(200).json({
      status: "success",
      data: parseInt(result.rows[0].total),
    });
  } catch (err) {
    console.error("Error getting total orders:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while getting total orders",
    });
  }
});

// Add endpoint to get total number of returned orders
router.get("/total-returned-orders", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(DISTINCT order_id) as total FROM order_return`
    );
    res.status(200).json({
      status: "success",
      data: parseInt(result.rows[0].total),
    });
  } catch (err) {
    console.error("Error getting total returned orders:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while getting total returned orders",
    });
  }
});

module.exports = router;
