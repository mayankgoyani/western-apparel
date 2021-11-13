const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    token: { type: String },
    rand: { type: String },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    mobilenumber: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
    userType: { type: String, default: "Customer" }
});

module.exports = mongoose.model("User", userSchema);