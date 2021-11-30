const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const utility = require('../core/utility');

service.addProduct = async (req, res, next) => {
    let size = req.body.size.split(" "), color =req.body.color.split(" ");
    const product = new Product({
        name: req.body.name,
        size : size,
        price: req.body.price,
        color: color,
        type: req.body.type,
        images : req.body.image,
        description: req.body.description,
    });
    let response = await product.save();
    res.redirect('/product/getProducts');
}

module.exports = service;
