const Item = require('../models/Item');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { name, barcode, quantity, price } = req.body;
        const newItem = new Item({ name, barcode, quantity, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
