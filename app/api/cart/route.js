const express = require('express');
const supabase = require('@supabase/supabase-js');

const router = express.Router();

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Handler for GET requests to fetch cart items
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabaseClient
            .from('cart')
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handler for POST requests to add an item to the cart
router.post('/', async (req, res) => {
    const { item } = req.body;
    try {
        const { data, error } = await supabaseClient
            .from('cart')
            .insert([{ item }]);

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handler for DELETE requests to remove an item from the cart
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabaseClient
            .from('cart')
            .delete()
            .match({ id });

        if (error) throw error;
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
