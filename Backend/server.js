const express = require("express");
const cors = require("cors");
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const billingRoutes = require("./routes/billingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

// Configure CORS before other middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// // Configure express-session with MemoryStore
// app.use(session({
//   store: new MemoryStore({
//     checkPeriod: 86400000 // prune expired entries every 24h
//   }),
//   secret: 'abc@0123',
//   resave: false,
//   saveUninitialized: false,
//   name: 'sessionId',
//   cookie: {
//     secure: false,  // Must be false for development without HTTPS
//     httpOnly: true,
//     sameSite: 'lax',
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     path: '/'  // Added explicit path
//   }
// }));


app.use(session({
  store: new MemoryStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
  }),
  secret: 'abc@123',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 86400000, // 1 day in milliseconds
      httpOnly: true,
      secure: false // Set to true if using HTTPS
  }
}));


// Modify session debug middleware to be more detailed
app.use((req, res, next) => {
  console.log('Session Debug:', {
    sessionID: req.sessionID,
    session: req.session,
    userId: req.session?.user?.id,
    isAuthenticated: !!req.session?.user,
    cookies: req.headers.cookie
  });
  next();
});

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});


// Add new route for raw SQL queries
app.post("/execute-query", async (req, res) => {
  const { query } = req.body;
  const pool = require("./database"); // Make sure this points to your database configuration

  try {
    const result = await pool.query(query);
    res.json({
      success: true,
      data: result.rows,
      rowCount: result.rowCount
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Routes without /api prefix
app.use("/auth", authRoutes);
app.use("/products", productRoutes);  // Changed from /api/products to /products
app.use("/customers", customerRoutes);
app.use("/cart", cartRoutes);
app.use("/billing", billingRoutes);
app.use("/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
