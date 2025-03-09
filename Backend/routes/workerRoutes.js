const express = require("express");
const router = express.Router();
const pool = require("../database");

// Create a new worker
router.post("/create", async (req, res) => {
  try {
    const { worker_name, worker_email, worker_contact_no, worker_salary } =
      req.body;
    const result = await pool.query(
      "INSERT INTO worker (worker_name, worker_email, worker_contact_no, worker_salary) VALUES ($1, $2, $3, $4) RETURNING *",
      [worker_name, worker_email, worker_contact_no, worker_salary]
    );
    // res.status(200).json(result.rows[0]);
    res.status(201).json({
      status: "success",
      data: result.rows[0],
      message: "Worker created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all workers
router.get("/get-all-workers-info", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM worker");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a worker
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM worker WHERE worker_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Worker not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Worker deleted successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
