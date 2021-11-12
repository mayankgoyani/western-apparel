const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type: String, required: true, unique: true, lowercase: true },
    password:{type: String, required: true, select: false},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    birthdate:{type: Date, required: true},
    mobilenumber: {type: Number, required: true },
    isActive:{type: Boolean, default: false}
}
);

module.exports = mongoose.model("User", userSchema);