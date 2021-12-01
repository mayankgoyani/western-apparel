const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    size: [{ type: String, required: true }],
    price: { type: String, required: true },
    color: [{ type: String, required: true }],
    images: { type: String, required: true },
    type: { type: String },
    countInStock: { type: Number },
    description: { type: String, required: true },
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Product", productSchema);
