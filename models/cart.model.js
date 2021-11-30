const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    color: { type: String },
    size: { type: String },
    price: { type: String },
    quantity: { type: Number, default: 1 },
    productId: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Cart", cartSchema);