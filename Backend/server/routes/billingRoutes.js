const express = require("express");
const router = express.Router();
const pool = require("../database");

// Create a new bill
router.post("/create", async (req, res) => {
  try {
    const { user_id, order_id, user_name, prod_id, prod_qty, prod_price, prod_total_price, order_total_price, bill_total_price, pay_status } = req.body;

    console.log("Creating bill with data:", req.body);

    const newBill = await pool.query(
      `INSERT INTO bill_detail (bill_date, user_id, order_id, user_name, prod_id, prod_qty, prod_price, prod_total_price, order_total_price, bill_total_price, pay_status)
       VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [user_id, order_id, user_name, prod_id, prod_qty, prod_price, prod_total_price, order_total_price, bill_total_price, pay_status]
    );

    console.log("Bill created successfully:", newBill.rows[0]);

    res.status(201).json({
      status: "success",
      data: newBill.rows[0],
      message: "Bill created successfully"
    });
  } catch (err) {
    console.error("Error creating bill:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while creating bill"
    });
  }
});

// Get all bill details
router.get("/details", async (req, res) => {
  try {
    const billDetails = await pool.query("SELECT * FROM bill_detail");
    res.status(200).json({
      status: "success",
      data: billDetails.rows,
      message: "Fetched all bill details successfully"
    });
  } catch (err) {
    console.error("Error fetching bill details:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching bill details"
    });
  }
});

// Get bill details by order ID
router.get("/details/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const billDetails = await pool.query("SELECT * FROM bill_detail WHERE order_id = $1", [order_id]);
    res.status(200).json({
      status: "success",
      data: billDetails.rows,
      message: `Fetched bill details for order ID ${order_id} successfully`
    });
  } catch (err) {
    console.error(`Error fetching bill details for order ID ${order_id}:`, err.message);
    res.status(500).json({
      status: "error",
      message: `Server error while fetching bill details for order ID ${order_id}`
    });
  }
});

module.exports = router;
