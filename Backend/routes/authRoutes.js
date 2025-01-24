const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_contact_no, is_admin } = req.body;
        
        // Check if user already exists
        const userExists = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [user_email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Create new user
        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_email, user_password, user_contact_no, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_name, user_email, hashedPassword, user_contact_no, is_admin]
        );

        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [user_email]
        );

        if (user.rows.length === 0 || !(await bcrypt.compare(user_password, user.rows[0].user_password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // // Set user data in session
        // req.session.regenerate(async function(err) {
        //     if (err) {
        //         console.error("Session regeneration error:", err);
        //         return res.status(500).json({ message: "Session error" });
        //     }

        //     req.session.user = {
        //         id: user.rows[0].user_id,
        //         email: user.rows[0].user_email,
        //         name: user.rows[0].user_name,
        //         is_admin: user.rows[0].is_admin
        //     };
        //     req.session.authenticated = true;

        //     // Wait for session to be saved
        //     await new Promise((resolve) => req.session.save(resolve));

        //     res.json({
        //         message: "Logged in successfully",
        //         user: req.session.user
        //     });
        // });

        req.session.user = {
            id: user.rows[0].user_id,
            email: user.rows[0].user_email,
            name: user.rows[0].user_name,
            is_admin: user.rows[0].is_admin
        };
        req.session.authenticated = true;
        
        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
                return res.status(500).json({ message: "Could not save session" });
            }
        
            res.json({
                message: "Logged in successfully",
                user: req.session.user
            });
        });
        
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Check auth status
router.get('/check-auth', async (req, res) => {
    try {
        console.log("Session in check-auth:", req.session);
        
        if (!req.session || !req.session.user) {
            return res.status(401).json({ 
                isAuthenticated: false,
                message: "No active session found"
            });
        }

        // Verify user still exists in database
        const user = await pool.query(
            'SELECT user_id, user_name, user_email, is_admin FROM users WHERE user_id = $1',
            [req.session.user.id]
        );

        if (user.rows.length === 0) {
            // User no longer exists in database
            req.session.destroy();
            return res.status(401).json({
                isAuthenticated: false,
                message: "User not found"
            });
        }

        res.status(200).json({ 
            isAuthenticated: true, 
            user: {
                id: user.rows[0].user_id,
                name: user.rows[0].user_name,
                email: user.rows[0].user_email,
                is_admin: user.rows[0].is_admin
            }
        });
    } catch (err) {
        console.error("Check-auth error:", err);
        res.status(500).json({ 
            isAuthenticated: false,
            message: "Server error during authentication check" 
        });
    }
});

// Check admin status
router.get('/check-admin', (req, res) => {
    if (req.session.user && req.session.user.is_admin) {
        res.status(200).json({ isAdmin: true });
    } else {
        res.status(200).json({ isAdmin: false });
    }
});

// Get user information
router.get('/user-info', async (req, res) => {
    try {
        // Force session reload
        await new Promise((resolve) => req.session.reload(resolve));

        console.log("Session after reload:", {
            id: req.sessionID,
            user: req.session?.user,
            authenticated: req.session?.authenticated
        });

        if (!req.session?.authenticated || !req.session?.user?.id) {
            return res.status(401).json({ 
                message: "Not authenticated",
                debug: { sessionId: req.sessionID }
            });
        }

        const userInfo = await pool.query(
            'SELECT user_id, user_name, user_email, user_contact_no, is_admin FROM users WHERE user_id = $1',
            [req.session.user.id]
        );

        if (userInfo.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            success: true,
            user: userInfo.rows[0]
        });
    } catch (err) {
        console.error("User info error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get current user ID
router.get('/current-user', (req, res) => {
  console.log('Current User Debug:', {
    sessionExists: !!req.session,
    sessionUser: req.session?.user,
    cookies: req.headers.cookie
  });

  if (req.session && req.session.user && req.session.user.id) {
    res.status(200).json({
      success: true,
      userId: req.session.user.id,
      sessionInfo: req.session.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
      debugInfo: {
        hasSession: !!req.session,
        hasSessionUser: !!req.session?.user,
        sessionID: req.sessionID
      }
    });
  }
});


// Get current user name
router.get('/current-user-name/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from req.params
        const userName = await pool.query(
            'SELECT user_name FROM users WHERE user_id = $1',
            [userId]
        );

        if (userName.rows.length === 0) {
            // Handle case where user is not found
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User name:", userName.rows[0].user_name);
        res.status(200).json({ user_name: userName.rows[0].user_name });
    } catch (err) {
        console.error("Error fetching user name:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// Update profile
router.put('/update-profile', async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_contact_no } = req.body;
        const userId = req.session.user.id;

        // Hash new password if provided
        let hashedPassword;
        if (user_password) {
            hashedPassword = await bcrypt.hash(user_password, 10);
        }

        // Update user information
        const updatedUser = await pool.query(
            `UPDATE users 
             SET user_name = $1, user_email = $2, user_password = COALESCE($3, user_password), user_contact_no = $4 
             WHERE user_id = $5 
             RETURNING user_id, user_name, user_email, user_contact_no, is_admin`,
            [user_name, user_email, hashedPassword, user_contact_no, userId]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update session user info
        req.session.user = {
            ...req.session.user,
            name: updatedUser.rows[0].user_name,
            email: updatedUser.rows[0].user_email
        };

        res.json({
            success: true,
            user: updatedUser.rows[0]
        });
    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update admin status
router.put('/update-admin-status', async (req, res) => {
    try {
        const { userId, isAdmin } = req.body;

        const updatedUser = await pool.query(
            'UPDATE users SET is_admin = $1 WHERE user_id = $2 RETURNING user_id, user_name, user_email, is_admin',
            [isAdmin, userId]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            success: true,
            user: updatedUser.rows[0]
        });
    } catch (err) {
        console.error("Update admin status error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await pool.query('SELECT user_id AS id, user_name AS name, user_email AS email, is_admin FROM users');
        res.status(200).json(users.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
});




// Logout
router.post('/logout', (req, res) => {
    try {
        if (!req.session) {
            return res.status(200).json({ message: "Already logged out" });
        }

        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json({ message: "Could not log out" });
            }

            res.clearCookie('sessionId');
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: "Server error during logout" });
    }
});

module.exports = router;

