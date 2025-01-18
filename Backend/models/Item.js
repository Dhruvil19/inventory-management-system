const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    barcode: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
});

// Avoid overwriting the model if it already exists
const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

module.exports = Item;
