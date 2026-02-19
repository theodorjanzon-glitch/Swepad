const express = require('express');
const router = express.Router();

// Sample data for inventory
let inventory = [{ id: 1, name: 'Item 1', quantity: 100 }, { id: 2, name: 'Item 2', quantity: 50 }];

// Get all inventory items
router.get('/', (req, res) => {
    res.json(inventory);
});

// Add a new inventory item
router.post('/', (req, res) => {
    const newItem = req.body;
    inventory.push(newItem);
    res.status(201).json(newItem);
});

// Update an inventory item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = inventory.findIndex(item => item.id == id);
    if (index !== -1) {
        inventory[index] = {...inventory[index], ...req.body};
        res.json(inventory[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete an inventory item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    inventory = inventory.filter(item => item.id != id);
    res.status(204).send();
});

module.exports = router;