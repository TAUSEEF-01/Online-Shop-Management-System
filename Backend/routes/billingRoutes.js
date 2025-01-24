const express = require("express");
const router = express.Router();
const pool = require("../database");

// Create a new bill
router.post("/create", async (req, res) => {
  try {
    const { user_id, order_id, user_name, products, order_total_price, bill_total_price, pay_status } = req.body;

    console.log("Creating bill with data:", req.body);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const billQuery = `
        INSERT INTO bill_detail (bill_date, user_id, order_id, user_name, order_total_price, bill_total_price, pay_status)
        VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, $6) RETURNING bill_id
      `;
      const billResult = await client.query(billQuery, [user_id, order_id, user_name, order_total_price, bill_total_price, pay_status]);
      const billId = billResult.rows[0].bill_id;

      const productQueries = products.map(product => {
        return client.query(`
          INSERT INTO bill_product (bill_id, prod_id, prod_qty, prod_price, prod_total_price)
          VALUES ($1, $2, $3, $4, $5)
        `, [billId, product.prod_id, product.prod_qty, product.prod_price, product.prod_total_price]);
      });

      await Promise.all(productQueries);

      await client.query('COMMIT');

      console.log("Bill created successfully with ID:", billId);

      res.status(201).json({
        status: "success",
        data: { bill_id: billId },
        message: "Bill created successfully"
      });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error("Error creating bill:", err.message);
      res.status(500).json({
        status: "error",
        message: "Server error while creating bill"
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error creating bill:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while creating bill"
    });
  }
});

// Get all bill details
router.get("/payment-done", async (req, res) => {
  try {
    const paidBillDetails = await pool.query(`SELECT * from bill_detail
      where pay_status = 'paid';`);
    res.status(200).json({
      status: "success",
      data: paidBillDetails.rows,
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



router.get("/natural-join", async (req, res) => {
  try {
    // console.log("Route params:", req.params);
    // console.log("Query params:", req.query);
    
    const query = `
      SELECT * 
      FROM order_detail NATURAL JOIN product;
    `;
    const results = await pool.query(query);
    // console.log("Raw query results:", results.rowCount);
    // const results = await dbQuery(query);
    console.log("Raw results:", results);
    res.status(200).json({
      status: "success",
      results,
      // data: results.rows,
      message: "Fetched natural join data successfully"
    }); // Ensure `results` is JSON serializable
  } catch (error) {
    console.error("Error fetching natural join data:", error);
    res.status(500).json({ message: "Failed to fetch data", error: error.message });
  }
});


// // Get bill details by order ID
// router.get("/details/:order_id", async (req, res) => {
//   try {
//     const { order_id } = req.params;
//     const billDetails = await pool.query("SELECT * FROM bill_detail WHERE order_id = $1", [order_id]);
//     res.status(200).json({
//       status: "success",
//       data: billDetails.rows,
//       message: `Fetched bill details for order ID ${order_id} successfully`
//     });
//   } catch (err) {
//     console.error(`Error fetching bill details for order ID ${order_id}:`, err.message);
//     res.status(500).json({
//       status: "error",
//       message: `Server error while fetching bill details for order ID ${order_id}`
//     });
//   }
// });



// Get bill details by order ID, including product details
router.get("/details/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;

    const query = `
      SELECT 
        bd.bill_id,
        bd.bill_date,
        bd.user_id,
        bd.order_id,
        bd.user_name,
        bd.order_total_price,
        bd.bill_total_price,
        bd.pay_status,
        bp.prod_id,
        bp.prod_qty,
        bp.prod_price,
        bp.prod_total_price
      FROM 
        bill_detail bd
      LEFT JOIN 
        bill_product bp
      ON 
        bd.bill_id = bp.bill_id
      WHERE 
        bd.order_id = $1
    `;

    const billDetails = await pool.query(query, [order_id]);

    // Restructure the response to group products under a single bill
    const billData = billDetails.rows.reduce((result, row) => {
      if (!result) {
        result = {
          bill_id: row.bill_id,
          bill_date: row.bill_date,
          user_id: row.user_id,
          order_id: row.order_id,
          user_name: row.user_name,
          order_total_price: row.order_total_price,
          bill_total_price: row.bill_total_price,
          pay_status: row.pay_status,
          products: [],
        };
      }

      if (row.prod_id) {
        result.products.push({
          prod_id: row.prod_id,
          prod_qty: row.prod_qty,
          prod_price: row.prod_price,
          prod_total_price: row.prod_total_price,
        });
      }

      return result;
    }, null);

    if (!billData) {
      return res.status(404).json({
        status: "error",
        message: `No bill details found for order ID ${order_id}`,
      });
    }

    res.status(200).json({
      status: "success",
      data: billData,
      message: `Fetched bill details for order ID ${order_id} successfully`,
    });
  } catch (err) {
    console.error(`Error fetching bill details for order ID ${order_id}:`, err.message);
    res.status(500).json({
      status: "error",
      message: `Server error while fetching bill details for order ID ${order_id}`,
    });
  }
});

// Get all billings by user ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = `
      SELECT 
        bd.bill_id,
        bd.bill_date,
        bd.order_total_price,
        bd.bill_total_price,
        bd.pay_status,
        bp.prod_id,
        bp.prod_qty,
        bp.prod_price,
        bp.prod_total_price
      FROM 
        bill_detail bd
      LEFT JOIN 
        bill_product bp
      ON 
        bd.bill_id = bp.bill_id
      WHERE 
        bd.user_id = $1
    `;

    const billings = await pool.query(query, [user_id]);

    // Restructure the response to group products under each bill
    const billingData = billings.rows.reduce((result, row) => {
      let bill = result.find(b => b.bill_id === row.bill_id);
      if (!bill) {
        bill = {
          bill_id: row.bill_id,
          bill_date: row.bill_date,
          order_total_price: row.order_total_price,
          bill_total_price: row.bill_total_price,
          pay_status: row.pay_status,
          products: [],
        };
        result.push(bill);
      }

      if (row.prod_id) {
        bill.products.push({
          prod_id: row.prod_id,
          prod_qty: row.prod_qty,
          prod_price: row.prod_price,
          prod_total_price: row.prod_total_price,
        });
      }

      return result;
    }, []);

    res.status(200).json({
      status: "success",
      data: billingData,
      message: `Fetched billing details for user ID ${user_id} successfully`,
    });
  } catch (err) {
    console.error(`Error fetching billing details for user ID ${user_id}:`, err.message);
    res.status(500).json({
      status: "error",
      message: `Server error while fetching billing details for user ID ${user_id}`,
    });
  }
});

// Update payment status
router.put("/updatePaymentStatus", async (req, res) => {
  const { billId, newStatus } = req.body;

  try {
    const updateQuery = `
      UPDATE bill_detail
      SET pay_status = $1
      WHERE bill_id = $2
    `;
    await pool.query(updateQuery, [newStatus, billId]);

    res.status(200).json({
      status: "success",
      message: "Payment status updated successfully",
    });
  } catch (err) {
    console.error("Error updating payment status:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error while updating payment status",
    });
  }
});

module.exports = router;
