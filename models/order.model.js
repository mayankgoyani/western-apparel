const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateFormat = require('dateformat');



const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    color: { type: String },
    size: { type: String },
    quantity: { type: Number, default: 1 },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    date: { type: String, default: dateFormat(new Date(),'mmm dd, yyyy') }
});

module.exports = mongoose.model("Order", orderSchema);