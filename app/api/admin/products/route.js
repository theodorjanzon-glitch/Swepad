// Import necessary modules
const express = require('express');
const router = express.Router();

// Mock middleware for authentication (admin only)
const adminAuth = (req, res, next) => {
    const isAdmin = true; // Replace with actual authentication logic
    if (!isAdmin) {
        return res.status(403).json({ message: 'Forbidden, admin access required' });
    }
    next();
};

// Mock database for products
let products = [];

// CREATE: Add a new product
router.post('/products', adminAuth, (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = { id: products.length + 1, name, price, description };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// READ: Get all products
router.get('/products', (req, res) => {
    res.status(200).json(products);
});

// READ: Get a single product by ID
router.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
});

// UPDATE: Update a product by ID
router.put('/products/:id', adminAuth, (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const { name, price, description } = req.body;
    product.name = name;
    product.price = price;
    product.description = description;
    res.status(200).json(product);
});

// DELETE: Remove a product by ID
router.delete('/products/:id', adminAuth, (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;
