const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const dateFormat = require('dateformat');



const utility = require('../core/utility');


service.getOrders = async (req, res, next) => {
    Order.find({ userId: req.user.id }).populate('product', 'name images price').exec(function (err, result) {
        // console.log(dateFormat(result[0].date, 'mmm dd, yyyy'));
        // res.json(result);

        res.render('pastOrder', { products: result });
    });

}

service.checkOut = async (req, res, next) => {
    Cart.find({ userId: req.user.id }, { _id: false }, async (err, results) => {
        results.forEach(async (result) => {
            // console.log(result);
            const order = await new Order({
                userId: result.userId,
                color: result.color,
                size: result.size,
                quantity: result.quantity,
                product: result.product
            });
            order.save();
        });
    });
    Cart.deleteMany({ userId: req.user.id }, (err) => {
        if (err) throw err;
    });
    res.redirect('/order/getOrders');

}

module.exports = service;
