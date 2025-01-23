// const express = require('express');
// const router = express.Router();
// const pool = require('../database');

// // Add customer endpoint
// router.post('/add', async (req, res) => {
//     try {
//         const { cust_name, cust_email, cust_contact_no } = req.body;

//         // Validate required fields
//         if (!cust_name || !cust_contact_no) {
//             return res.status(400).json({
//                 error: "Customer name and contact number are required"
//             });
//         }

//         // Insert customer into database
//         const newCustomer = await pool.query(
//             "INSERT INTO customer (cust_name, cust_email, cust_contact_no) VALUES ($1, $2, $3) RETURNING *",
//             [cust_name, cust_email, cust_contact_no]
//         );

//         console.log(newCustomer.rows[0]);

//         res.json({
//             status: "success",
//             data: newCustomer.rows[0],
//             message: "Customer added successfully"
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({
//             error: "Server error while adding customer"
//         });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const pool = require('../database'); // Ensure your pool configuration is correct



// router.post('/add', async (req, res) => {
//     try {
//         const { cust_name, cust_email, cust_contact_no } = req.body;

//         // Validate required fields
//         if (!cust_name || !cust_contact_no) {
//             return res.status(400).json({
//                 error: "Customer name and contact number are required"
//             });
//         }

//         // Insert customer into database
//         const newCustomer = await pool.query(
//             "INSERT INTO customer (cust_name, cust_email, cust_contact_no) VALUES ($1, $2, $3) RETURNING *",
//             [cust_name, cust_email || null, cust_contact_no]
//         );

//         console.log(newCustomer.rows[0]);

//         res.status(201).json({
//             status: "success",
//             data: newCustomer.rows[0],
//             message: "Customer added successfully"
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({
//             error: "Server error while adding customer"
//         });
//     }
// });

// Add customer endpoint
router.post('/add', async (req, res) => {
    try {
        // Log the request body to verify it
        console.log("Request Body:", req.body);

        const { cust_name, cust_email, cust_contact_no } = req.body;

        // Validate required fields
        if (!cust_name || !cust_contact_no || !cust_email) {
            return res.status(400).json({
                error: "Customer name, email, and contact number are required"
            });
        }

        // Insert customer into the database
        const newCustomer = await pool.query(
            "INSERT INTO customer (cust_name, cust_email, cust_contact_no) VALUES ($1, $2, $3) RETURNING *",
            [cust_name, cust_email, cust_contact_no]
        );

        console.log("Inserted Customer:", newCustomer.rows[0]);

        res.status(201).json({
            status: "success",
            data: newCustomer.rows[0],
            message: "Customer added successfully"
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({
            error: "Server error while adding customer"
        });
    }
});


module.exports = router;
