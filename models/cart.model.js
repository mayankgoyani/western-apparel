const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    color: { type: String },
    size: { type: String },
    quantity: { type: Number, default: 1 },
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model("Cart", cartSchema);