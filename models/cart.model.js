const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name: { type: String },   //
    color: { type: String },
    size: { type: String },
    price: { type: String },
    quantity: { type: Number, default: 1 },
    productId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
    userEmail: { type: String }
});

module.exports = mongoose.model("Cart", cartSchema);