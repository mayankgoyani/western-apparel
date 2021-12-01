const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const utility = require('../core/utility');

service.addProduct = async (req, res, next) => {
    let size = req.body.size.split(" "), color = req.body.color.split(" ");
    const product = new Product({
        name: req.body.name,
        size: size,
        price: req.body.price,
        color: color,
        type: req.body.type,
        images: req.body.image,
        description: req.body.description,
    });
    let response = await product.save();
    res.redirect('/product/getProducts');
}

service.getEditProduct = async (req, res, next) => {
    Product.findOne(
        { _id: req.params.id },
        (err, products) => {
            if (err) throw err;
            // console.log(products);
            res.render('admin/editProduct', { product: products });
        });
}

service.postEditProduct = async (req, res, next) => {
    let size = req.body.size.split(" "), color = req.body.color.split(" ");
    await Product.updateOne(
        { _id: req.params.id }, {
        $set: {
            name: req.body.name,
            size: size,
            price: req.body.price,
            color: color,
            type: req.body.type,
            images: req.body.image,
            description: req.body.description,
        }
    });
    res.redirect('/product/getProducts');
}

module.exports = service;
