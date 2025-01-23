// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');

// const app = express();

// // Configure CORS
// app.use(cors({
//   origin: 'http://localhost:3000', // Your Next.js frontend URL
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// // Session configuration
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   name: 'sessionId',
//   cookie: {
//     secure: false, // set to true in production with HTTPS
//     httpOnly: true,
//     sameSite: 'lax',
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// app.use(express.json());

// const cartRoutes = require("./routes/cartRoutes");
// app.use("/api/cart", cartRoutes);

// // ...rest of your server configuration...
