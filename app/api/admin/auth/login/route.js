'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy user for demonstration (replace with your actual user retrieval logic)
const adminUser = {
    email: 'admin@example.com', // replace with your actual admin email
    password: 'password123' // replace with your actual admin password or hash
};

// Middleware to validate login data
const validateLoginData = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    next();
};

// POST /admin/auth/login
router.post('/login', validateLoginData, (req, res) => {
    const { email, password } = req.body;
    
    // Validate admin credentials (replace with your actual validation logic)
    if (email === adminUser.email && password === adminUser.password) {
        // Create JWT token
        const token = jwt.sign({ email: adminUser.email }, 'your_jwt_secret', { expiresIn: '1h' }); // use a secure secret
        return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Invalid email or password.' });
});

module.exports = router;
