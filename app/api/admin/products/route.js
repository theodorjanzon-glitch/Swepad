'use strict';

const express = require('express');
const router = express.Router();

// In-memory product storage (for demonstration purposes)
let products = [];

// Create a new product
router.post('/', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Simple ID assignment
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get a product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Update a product by ID
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    Object.assign(product, req.body);
    res.json(product);
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;
